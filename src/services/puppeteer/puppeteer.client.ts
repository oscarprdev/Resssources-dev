import { TakeScreenshotInput, TakeScreenshotOutput } from './puppeteer.client.types';
import puppeteer from 'puppeteer';
import chromium from '@sparticuz/chromium-min';

const chromiumPack = 'https://github.com/Sparticuz/chromium/releases/download/v121.0.0/chromium-v121.0.0-pack.tar';

export interface IPuppeteerClient {
	takeScreenshot(input: TakeScreenshotInput): Promise<TakeScreenshotOutput>;
}

export class PuppeteerClient implements IPuppeteerClient {
	constructor() {}

	async takeScreenshot({ url, type }: TakeScreenshotInput): Promise<TakeScreenshotOutput> {
		try {
			const browser = await puppeteer.launch({
				args: chromium.args,
				executablePath: await chromium.executablePath(chromiumPack),
				headless: chromium.headless,
			});

			const page = await browser.newPage();
			page.setDefaultNavigationTimeout(0);

			await page.setViewport({ width: 1200, height: 800 });
			await page.goto(url, { waitUntil: 'networkidle0' });

			const screenshot = await page.screenshot({ quality: 100, type });

			await browser.close();

			return { screenshot };
		} catch (error) {
			throw new Error(error instanceof Error ? `takeScreenshotClient: ${error.message}` : '');
		}
	}
}
