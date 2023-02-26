import { expect, test } from '@playwright/test'

test('has content', async ({ page }) => {
	await page.goto('/')
	expect(page.getByText(/Hello world/)).toBeTruthy()
})
