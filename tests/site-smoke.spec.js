const { expect, test } = require('@playwright/test')

const articlePath = '/posts/tailscale-traefik-private-ca/'

test('mobile menu exposes one search field and no header search panel', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'mobile-only smoke')

  await page.goto('/')
  await expect(page.locator('.search-toggle')).toBeHidden()
  await expect(page.locator('#search-container')).toBeHidden()

  await page.locator('.mobile-menu-toggle').click()
  await expect(page.locator('#mobile-menu-overlay')).toBeVisible()
  await expect(page.locator('.mobile-menu-search input[type="text"]')).toBeVisible()
  await expect(page.locator('input[type="text"]:visible')).toHaveCount(1)
})

test('mobile table of contents opens as a scrollable bottom sheet', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'mobile-only smoke')

  await page.goto(articlePath)
  const tocFab = page.locator('#tocFab')
  await expect(tocFab).toBeVisible()
  await tocFab.click()

  const sheet = page.locator('#tocSheet')
  const body = page.locator('#tocSheetBody')
  await expect(sheet).toBeVisible()
  await expect(body.locator('a').first()).toBeVisible()

  const metrics = await body.evaluate((element) => ({
    canScroll: element.scrollHeight > element.clientHeight,
    linkLeft: element.querySelector('a').getBoundingClientRect().left,
    bodyLeft: element.getBoundingClientRect().left
  }))
  expect(metrics.canScroll).toBeTruthy()
  expect(metrics.linkLeft).toBeGreaterThan(metrics.bodyLeft)
})

test('callouts use static type-tinted backgrounds', async ({ page }) => {
  await page.goto(articlePath)
  const alert = page.locator('blockquote.alert').first()
  await expect(alert).toBeVisible()

  const style = await alert.evaluate((element) => {
    const computed = window.getComputedStyle(element)
    return {
      backgroundImage: computed.backgroundImage,
      backgroundColor: computed.backgroundColor
    }
  })
  expect(style.backgroundImage).toBe('none')
  expect(style.backgroundColor).not.toBe('rgba(0, 0, 0, 0)')
})

test('posts can copy their source as markdown', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write'])
  await page.goto(articlePath)

  const copyButton = page.locator('[data-copy-markdown]')
  await expect(copyButton).toBeVisible()
  await expect(copyButton).toContainText('Copy as markdown')

  await copyButton.click()
  await expect(copyButton).toContainText('Copied')

  const copied = await page.evaluate(() => navigator.clipboard.readText())
  expect(copied).toContain('# Tailscale + Traefik + Private CA')
  expect(copied).toContain('I run a hybrid networking setup')
})

test('desktop keeps desktop navigation visible', async ({ page, isMobile }) => {
  test.skip(isMobile, 'desktop-only smoke')

  await page.goto('/')
  await expect(page.locator('.p-menu').first()).toBeVisible()
  await expect(page.locator('.mobile-menu-toggle')).toBeHidden()
  await expect(page.locator('.search-toggle')).toBeVisible()
})
