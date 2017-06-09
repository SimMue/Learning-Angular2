import { MyFirstNg2appPage } from './app.po';

describe('my-first-ng2app App', () => {
  let page: MyFirstNg2appPage;

  beforeEach(() => {
    page = new MyFirstNg2appPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
