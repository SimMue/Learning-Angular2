import { SnakeGamePage } from './app.po';

describe('snake-game App', () => {
  let page: SnakeGamePage;

  beforeEach(() => {
    page = new SnakeGamePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
