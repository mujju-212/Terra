import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        # User's exact viewport: 1536x760
        context = await browser.new_context(viewport={'width': 1536, 'height': 760})
        page = await context.new_page()
        await page.goto('http://localhost:5174/module/water#ch-05', wait_until='networkidle')
        await asyncio.sleep(1)
        
        cards = await page.query_selector_all('.water-sector-card')
        if cards:
            await cards[0].click()
            await asyncio.sleep(0.5)
            
            # Check dimensions and scroll properties of modal
            info = await page.evaluate('''() => {
                const backdrop = document.querySelector('.water-modal-backdrop');
                const card = document.querySelector('.water-sector-modal-card');
                const content = document.querySelector('.water-sector-modal-content');
                
                return {
                    backdrop: {
                        clientHeight: backdrop ? backdrop.clientHeight : 0,
                        scrollHeight: backdrop ? backdrop.scrollHeight : 0,
                        scrollTop: backdrop ? backdrop.scrollTop : 0
                    },
                    card: {
                        clientHeight: card ? card.clientHeight : 0,
                        scrollHeight: card ? card.scrollHeight : 0,
                        offsetHeight: card ? card.offsetHeight : 0
                    },
                    content: {
                        clientHeight: content ? content.clientHeight : 0,
                        scrollHeight: content ? content.scrollHeight : 0,
                        scrollTop: content ? content.scrollTop : 0,
                        overflowY: content ? window.getComputedStyle(content).overflowY : ''
                    }
                };
            }''')
            print("Modal elements debug info at 760px viewport height:")
            print(info)
            
            # Try scrolling wheel on content
            await page.mouse.move(768, 500)
            await page.mouse.wheel(0, 300)
            await asyncio.sleep(0.5)
            
            scroll_after = await page.evaluate('''() => {
                const content = document.querySelector('.water-sector-modal-content');
                return content ? content.scrollTop : -1;
            }''')
            print("content.scrollTop after wheel(0, 300):", scroll_after)
            
            # Also try scrolling on backdrop or banner
            await page.mouse.move(300, 300)
            await page.mouse.wheel(0, 300)
            await asyncio.sleep(0.5)
            
            page_scroll = await page.evaluate('window.scrollY')
            print("window.scrollY:", page_scroll)
            
        await browser.close()

asyncio.run(run())
