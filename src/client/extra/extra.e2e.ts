import { browser, by, element } from 'protractor';

describe('App', () => {

  beforeEach(() => {
    browser.get('/#/extra');
  });

  it('should have a title', () => {
    let subject = browser.getTitle();
    let result  = 'extra ready!';
    expect(subject).toEqual(result);
  });

});
