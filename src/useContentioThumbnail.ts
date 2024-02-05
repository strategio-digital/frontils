import { useContentioApi } from './useContentioApi.ts'

type Params = {
    path: string,
    method: string,
    quality: number,
    width: number | null
    height: number | null
}

interface IOnCreated {
    (params: Params, src: string): void
}

export const useContentioThumbnail = (onCreated?: IOnCreated, apiUri: string | null = null) => {

    const api = useContentioApi(apiUri)

    const requestQueue: string[] = []

    function replaceDomain(src: string): string {
        return src.replace(/^http[s]?:\/\/.+?\//, '')
    }

    function replacePath(src: string): string {
        return src.replace(replaceDomain(src), '')
    }

    function extractParams(src: string): Params | null {
        // example: _develop_contentio_app/article/56/test--thumb-[SHRINK_ONLY-80-100x100].jpeg

        const regex = /(.*)\-\-thumb\[([A-Z\_]+)\-([0-9]{1,3})\-([0-9]*)x([0-9]*)\](.*)/
        const path = replaceDomain(src)
        const groups = regex.exec(path) as string[]

        if (groups === null) {
            return null
        }

        const thumbPath = (groups[1] + groups[6])
        const width = isNaN(parseInt(groups[4])) ? null : parseInt(groups[4])
        const height = isNaN(parseInt(groups[5])) ? null : parseInt(groups[5])

        return {
            path: thumbPath,
            method: groups[2],
            quality: parseInt(groups[3]),
            width,
            height
        }
    }

    function getImagesBySameSrc(src: string): HTMLImageElement[] {
        const nodes: NodeListOf<HTMLImageElement> = document.querySelectorAll('img[data-thumb]')
        return Array.from(nodes).filter(node => node.src === src)
    }

    async function loadThumbnail(src: string, params: Params): Promise<void> {
        const sameImages = getImagesBySameSrc(src)

        try {
            const resp = await api.fetchApi('/image/create', {
                method: 'POST',
                body: JSON.stringify(params)
            })

            if (! resp.success) return

            sameImages.map(el => {
                const copy = el.cloneNode(true) as HTMLImageElement
                const source = replacePath(src) + resp.data.path
                el.parentNode?.insertBefore(copy, el.nextSibling)
                el.remove()
                copy.src = source
            })
        } catch (e) {
            console.error(e)
        }

        if (onCreated) onCreated(params, src)
    }

    function registerEvents() {
        window.addEventListener('error', async ({ target}) => {
            // Zkontroluje, jestli chyba pochází z načítání zdrojů
            if (target !== window) {
                // @ts-ignore
                const source: string = target.src || target.href
                if (! source.startsWith('https://cdn.contentio.app/')) return

                if (requestQueue.filter(src => source === src).length !== 0) return
                requestQueue.push(source)

                const params = extractParams(source)
                if (! params) return

                loadThumbnail(source, params)
            }
        }, true) // Použití 'true' pro zachycení chyby v fázi capture

        const els: HTMLImageElement[] = Array.from(document.querySelectorAll('img[data-src]'))
        els.forEach(el => el.src = el.getAttribute('data-src') as string)
    }

    return {
        registerEvents,
        replaceDomain,
        replacePath,
        extractParams,
        getImagesBySameSrc,
        loadThumbnail,
        requestQueue
    }
}