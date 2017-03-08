import { expect } from 'chai';
import jsdom from 'jsdom';
import fs from 'fs';

describe('Our first test', () => {
  it('should pass', () => {
    expect(true).to.equal(true);
  });
});

describe('index.html', () => {
  const index = fs.readFileSync('./src/index.html', 'utf-8');

  it('should have an img logo', (done) => {
    jsdom.env(index, function(err, window) {
      const img = window.document.getElementsByTagName('img')[0];
      expect(img.getAttribute('src')).to.equal('./logo.png');
      done();
      window.close();
    });
  });

  it('should have h1 that says \'JS Starter Kit\'', (done) => {
    jsdom.env(index, function(err, window) {
      const h1 = window.document.getElementsByTagName('h1')[0];
      expect(h1.innerHTML).to.equal('JS Starter Kit');
      done();
      window.close();
    });
  });

  it('should have an \'items\' table', (done) => {
    jsdom.env(index, function(err, window) {
      const table = window.document.getElementsByTagName('table')[0];
      expect(table.id).to.equal('items');
      done();
      window.close();
    })
  });
});
