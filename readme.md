# Megio frontils

Frontend utils for your web-projects.

## Installation

```shell
yarn add megio-frontils
```

## Setup

### Analytics (GTM)

```typescript
import { useAnalytics } from 'megio-frontils'

const gtm = useAnalytics()

gtm.injectScript()
gtm.trackLeadGenerate('eventLabel')
gtm.trackNewsletterSubscribe('eventLabel')
gtm.enableGtmCookie(type)
gtm.disableGtmCookie(type)
gtm.disableAllGtmCookies()
```

### AntiSpam

```typescript
import { useAntiSpam } from 'megio-frontils'

const antispam = useAntiSpam(timeOutMs, message)
antispam.isReady() // true | false
```

### Carousel

```typescript
import { useCarousel } from 'megio-frontils'

const el = document.getElementById('carousel')
const carousel = useCarousel(el, { autoPlay: { speed: 3000, enabled: true } })

carousel.create()
carousel.next()
carousel.prev()
carousel.getStats()
```

```html

<style>
    .carousel-hide { ... }
    .carousel-show { ... }
</style>

<div id="carousel">
    <button data-carousel="next"></button>
    <button data-carousel="prev"></button>
    <div data-carousel="counter">0 / 0</div>
    <div>
        <div data-carousel="item">One</div>
        <div data-carousel="item">Two</div>
    </div>
</div>
```

### Sticky-hiding navbar like [jz.strategio.dev](https://jz.strategio.dev)
```typescript
import { useNavbar } from 'megio-frontils'

const navbar = useNavbar(showBgFrom, stayDownFor, stayUpFor)

navbar.registerEvents()
navbar.close()
navbar.open()
```

```html
<style>
    .navbar.hidden { ... }
    .navbar.active { ... }
    .navbar.show-bg { ... }
    .navbar-hamburger.active { ... }
</style>

<body>
    <div class="navbar">
        <button class="navbar-hamburger">menu</button>
        <div class="navbar-content">
            <a href="/" data-navbar-link>Home</a>
            <a href="/blog" data-navbar-link>Blog</a>
        </div>
    </div>
</body>
```

### Scroller
```typescript
import { useScroller } from 'megio-frontils'

const scroller = useScroller(menuHeight)

scroller.registerEvents()
scroller.scrollTo(selector)
scroller.scrollDirection() // get current scrollign direction
```

### Stepper
```typescript
import { useStepper } from 'megio-frontils'

const stepper = useStepper()
scroller.registerEvents()
```

```html
<style>
    [data-step].active { ... }
</style>

<div>
    <div data-step="1">1. Send form</div>
    <div data-step="2">2. Get online meet</div>
    <div data-step="3">3. Sign contract</div>
</div>
```

### Switcher (tabs)
```typescript
import { useSwitcher } from 'megio-frontils'

const el = document.getElementById('switcher')
const switcher = useSwitcher(el)

switcher.registerEvents()
```

```html
<style>
    [data-switcher-btn].active { ... }
    [data-switcher-wrapper] > div.active { ... }
</style>

<div id="switcher">
    <button data-switcher-btn="1">Show first</button>
    <button data-switcher-btn="2">Show second</button>
    <div data-switcher-wrapper>
        <div>First content</div>
        <div>Second content</div>
    </div>
</div>
```

### Contentio API
```typescript
import { useContentioApi } from 'megio-frontils'

const apiUri = 'https://<project>.contentio.app/api'
const api = useContentioApi(apiUri)
await api.fetchApi(uri, { body: JSON.stringify({ data: 'xyz' }) })
```

### Contentio thumbnails
```typescript
import { useContentioThumbnails } from 'megio-frontils'

function onCreated(params, src) { console.log(params, src) }

const apiUri = 'https://<project>.contentio.app/api'
const thumbs = useContentioThumbnails(onCreated, apiUri)

thumbs.registerEvents()
```

```html
<img data-thumb src="https://cdn.contentio.app/{$thumb->getSrc()}">
```
