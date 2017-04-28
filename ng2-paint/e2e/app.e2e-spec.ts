import { Ng2PaintPage } from './app.po';

describe('ng2-paint App', () => {
  let page: Ng2PaintPage;

  beforeEach(() => {
    page = new Ng2PaintPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
