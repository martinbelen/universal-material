import { browser, by, element } from 'protractor';

describe('App', () => {

  beforeEach(() => {
    browser.get('/#/home');
  });

  it('should have a title', () => {
    let subject = browser.getTitle();
    let result  = 'home ready!';
    expect(subject).toEqual(result);
  });

});
