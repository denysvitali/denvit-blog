import Zooming from 'zooming'
import Swiper, { Navigation } from 'swiper'
Swiper.use([Navigation])

document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.mobile-menu-toggle')
  const overlay = document.getElementById('mobile-menu-overlay')
  const closeBtn = document.getElementById('mobile-menu-close')
  const searchToggle = document.querySelector('.search-toggle')
  const searchContainer = document.getElementById('search-container')
  const header = document.querySelector('.l-header')
  const focusableSelector = 'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
  let lastFocused = null

  function getMenuFocusable () {
    if (!overlay) return []
    return Array.prototype.filter.call(
      overlay.querySelectorAll(focusableSelector),
      (el) => el.offsetParent !== null
    )
  }

  function isMenuOpen () {
    return overlay && overlay.classList.contains('is-open')
  }

  function openMenu () {
    if (!toggle || !overlay) return
    lastFocused = document.activeElement
    toggle.setAttribute('aria-expanded', 'true')
    overlay.hidden = false
    document.body.classList.add('has-open-menu')
    requestAnimationFrame(() => {
      overlay.classList.add('is-open')
      if (closeBtn) closeBtn.focus()
    })
  }

  function closeMenu () {
    if (!toggle || !overlay) return
    toggle.setAttribute('aria-expanded', 'false')
    overlay.classList.remove('is-open')
    document.body.classList.remove('has-open-menu')
    setTimeout(() => { overlay.hidden = true }, 300)
    if (lastFocused && typeof lastFocused.focus === 'function') {
      lastFocused.focus()
    } else {
      toggle.focus()
    }
  }

  if (toggle && overlay) {
    toggle.addEventListener('click', () => {
      if (isMenuOpen()) closeMenu()
      else openMenu()
    })
  }

  if (closeBtn) closeBtn.addEventListener('click', closeMenu)

  if (overlay) {
    overlay.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMenu)
    })
  }

  document.addEventListener('keydown', (event) => {
    if (!isMenuOpen()) return
    if (event.key === 'Escape' || event.key === 'Esc') {
      event.preventDefault()
      closeMenu()
      return
    }

    if (event.key !== 'Tab') return
    const focusables = getMenuFocusable()
    if (focusables.length === 0) {
      event.preventDefault()
      return
    }

    const first = focusables[0]
    const last = focusables[focusables.length - 1]
    const active = document.activeElement
    if (event.shiftKey && active === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && active === last) {
      event.preventDefault()
      first.focus()
    } else if (!overlay.contains(active)) {
      event.preventDefault()
      first.focus()
    }
  })

  if (searchToggle && searchContainer) {
    searchToggle.addEventListener('click', () => {
      const isHidden = searchContainer.hidden
      searchContainer.hidden = !isHidden
      searchToggle.setAttribute('aria-expanded', String(isHidden))
      if (isHidden && searchContainer.querySelector('#search-desktop')) {
        const input = searchContainer.querySelector('.pagefind-ui__search-input')
        if (input) setTimeout(() => input.focus(), 100)
      }
    })
  }

  if (header) {
    const onScroll = () => {
      header.classList.toggle('is-scrolled', window.scrollY > 4)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
  }

  const zooming = new Zooming({
    scaleBase: 0.5
  })
  zooming.listen('.img-zoomable')

  // eslint-disable-next-line
  const swiper = new Swiper('.swiper-container', {
    loop: true,
    slidesPerView: 1,
    centeredSlides: true,
    spaceBetween: 30,
    navigation: {
      nextEl: '.related-next',
      prevEl: '.related-prev'
    },
    breakpoints: {
      640: {
        slidesPerView: 3,
        spaceBetween: 10
      }
    }
  })

  // ===== Table of Contents =====
  const tocContainer = document.getElementById('tableOfContentContainer')
  const tocHeader = tocContainer
    ? tocContainer.querySelector('.tableOfContentContainer__title, h3')
    : null
  const tocBody = tocContainer
    ? tocContainer.querySelector('.tableOfContentContainer__body')
    : null
  const tocList = tocBody ? tocBody.querySelector('ul') : null
  const tocCountEl = tocContainer
    ? tocContainer.querySelector('.tableOfContentContainer__count')
    : null
  const tocSheet = document.getElementById('tocSheet')
  const tocSheetBody = document.getElementById('tocSheetBody')
  const tocFab = document.getElementById('tocFab')

  const mobileMQ = window.matchMedia('(max-width: 767px)')
  const belowDesktopMQ = window.matchMedia('(max-width: 1023px)')

  // --- Section count hint ---
  function setSectionCount () {
    if (!tocCountEl || !tocBody) return
    const n = tocBody.querySelectorAll('a').length
    tocCountEl.textContent = n ? `${n} section${n === 1 ? '' : 's'}` : ''
  }

  // --- Inline TOC collapse on mobile ---
  function applyMobileCollapse () {
    if (!tocContainer || !tocHeader || !tocList) return
    if (!mobileMQ.matches) {
      tocContainer.classList.remove('is-collapsible', 'is-collapsed')
      tocHeader.removeAttribute('role')
      tocHeader.removeAttribute('tabindex')
      tocHeader.setAttribute('aria-expanded', 'true')
      return
    }
    if (!tocContainer.classList.contains('is-collapsible')) {
      tocContainer.classList.add('is-collapsible', 'is-collapsed')
      tocHeader.setAttribute('role', 'button')
      tocHeader.setAttribute('tabindex', '0')
      tocHeader.setAttribute('aria-expanded', 'false')
      if (tocBody && !tocBody.id) tocBody.id = 'tocBody'
      tocHeader.setAttribute('aria-controls', tocBody ? tocBody.id : '')
    }
  }

  function toggleInlineToc () {
    if (!tocContainer || !tocHeader) return
    const willCollapse = !tocContainer.classList.contains('is-collapsed')
    tocContainer.classList.toggle('is-collapsed', willCollapse)
    tocHeader.setAttribute('aria-expanded', String(!willCollapse))
  }

  if (tocContainer && tocHeader && tocList) {
    setSectionCount()
    applyMobileCollapse()
    tocHeader.addEventListener('click', toggleInlineToc)
    tocHeader.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        toggleInlineToc()
      }
    })
    if (mobileMQ.addEventListener) {
      mobileMQ.addEventListener('change', applyMobileCollapse)
    } else if (mobileMQ.addListener) {
      mobileMQ.addListener(applyMobileCollapse)
    }
  }

  // --- Scroll spy (annotates BOTH inline TOC + sheet links) ---
  function initScrollSpy () {
    const headerEl = document.querySelector('.l-header')
    const headerOffset = headerEl ? headerEl.offsetHeight : 52
    const headings = document.querySelectorAll(
      '#js-article h1, #js-article h2, #js-article h3, #js-article h4'
    )
    if (!headings.length) return

    const roots = [tocContainer, tocSheetBody].filter(Boolean)
    if (!roots.length) return

    const linkMap = {}
    headings.forEach((h) => {
      if (!h.id) return
      linkMap[h.id] = []
      roots.forEach((root) => {
        const link = root.querySelector(`a[href="#${CSS.escape(h.id)}"]`)
        if (link) linkMap[h.id].push(link)
      })
    })

    const allLinks = []
    roots.forEach((r) => r.querySelectorAll('a').forEach((a) => allLinks.push(a)))

    function update () {
      const scrollY = window.scrollY
      const margin = headerOffset + 20

      let activeId = null
      let maxOffset = -Infinity
      let firstOffset = 0

      headings.forEach((h) => {
        if (!h.id || !linkMap[h.id]) return
        const off = h.offsetTop - margin
        if (off <= scrollY && off > maxOffset) {
          maxOffset = off
          activeId = h.id
        }
      })

      firstOffset = headings[0].offsetTop - margin
      if (scrollY <= firstOffset) activeId = null
      if (!activeId && scrollY > firstOffset) activeId = headings[headings.length - 1].id

      allLinks.forEach((a) => a.classList.remove('active'))
      if (activeId && linkMap[activeId]) {
        linkMap[activeId].forEach((a) => a.classList.add('active'))
      }
    }

    let ticking = false
    window.addEventListener(
      'scroll',
      () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            update()
            ticking = false
          })
          ticking = true
        }
      },
      { passive: true }
    )
    window.addEventListener('resize', update, { passive: true })
    update()
  }
  initScrollSpy()

  // --- Floating FAB + bottom sheet ---
  function openSheet () {
    if (!tocSheet) return
    tocSheet.hidden = false
    document.body.classList.add('has-open-toc-sheet')
    requestAnimationFrame(() => tocSheet.classList.add('is-open'))
    if (tocFab) tocFab.setAttribute('aria-expanded', 'true')
    const closeBtn = tocSheet.querySelector('.p-toc-sheet__close')
    if (closeBtn) closeBtn.focus({ preventScroll: true })
  }
  function closeSheet () {
    if (!tocSheet) return
    tocSheet.classList.remove('is-open')
    document.body.classList.remove('has-open-toc-sheet')
    if (tocFab) tocFab.setAttribute('aria-expanded', 'false')
    setTimeout(() => { tocSheet.hidden = true }, 280)
    if (tocFab) tocFab.focus({ preventScroll: true })
  }

  if (tocFab && tocSheet && tocSheetBody) {
    let inlineInView = !mobileMQ.matches
    const updateFabVisibility = () => {
      if (mobileMQ.matches) inlineInView = false
      const show = belowDesktopMQ.matches && !inlineInView
      tocFab.hidden = !show
      tocFab.classList.toggle('is-visible', show)
    }
    if (tocContainer && 'IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        inlineInView = entries[0].isIntersecting
        updateFabVisibility()
      }, { rootMargin: '-40px 0px -40% 0px', threshold: 0 })
      io.observe(tocContainer)
    } else {
      inlineInView = false
    }
    updateFabVisibility()
    if (belowDesktopMQ.addEventListener) {
      belowDesktopMQ.addEventListener('change', updateFabVisibility)
    } else if (belowDesktopMQ.addListener) {
      belowDesktopMQ.addListener(updateFabVisibility)
    }

    tocFab.addEventListener('click', openSheet)

    tocSheet.querySelectorAll('[data-toc-sheet-close]').forEach((el) => {
      el.addEventListener('click', closeSheet)
    })
    tocSheetBody.addEventListener('click', (e) => {
      const a = e.target.closest('a[href^="#"]')
      if (a) {
        // Browser handles the hash jump (scroll-margin-top covers offset).
        setTimeout(closeSheet, 60)
      }
    })
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && tocSheet.classList.contains('is-open')) closeSheet()
    })

    // Swipe-down to close
    let startY = null
    const panel = tocSheet.querySelector('.p-toc-sheet__panel')
    if (panel) {
      panel.addEventListener('touchstart', (e) => {
        if (tocSheetBody.scrollTop > 0) { startY = null; return }
        startY = e.touches[0].clientY
      }, { passive: true })
      panel.addEventListener('touchmove', (e) => {
        if (startY === null) return
        const dy = e.touches[0].clientY - startY
        if (dy > 70) { startY = null; closeSheet() }
      }, { passive: true })
    }
  }
})
