const h = require('../helpers');
var assert = require('assert');

describe('fixClass', function () {
  it('should let container pass through', function () {
    assert.equal(h.fixClass('container'), 'container');
  });
  it('should let mx-auto pass through', function () {
    assert.equal(h.fixClass('mx-auto'), 'mx-auto');
  });
  it('responsive', function () {
    assert.equal(h.fixClass('sm\:mx-auto'), 'sm:mx-auto');
  });
  it('responsive and focus', function () {
    assert.equal(h.fixClass('.xl\:focus\:no-underline:focus'), 'xl:focus:no-underline');
  });
  it('with prefix', function () {
    assert.equal(h.fixClass('hover\:tw-bg-blue-500:hover'), 'hover:tw-bg-blue-500');
  });
});

describe('fixClass -> toElmName', function () {
  it('should let container pass through', function () {
    assert.equal(h.toElmName(h.fixClass('container')), 'container');
  });
  it('should let mx-auto pass through', function () {
    assert.equal(h.toElmName(h.fixClass('mx-auto')), 'mx_auto');
  });
  it('responsive', function () {
    assert.equal(h.toElmName(h.fixClass('sm\:mx-auto')), 'sm_mx_auto');
  });
  it('responsive and focus', function () {
    assert.equal(h.toElmName(h.fixClass('.xl\:focus\:no-underline:focus')), 'xl_focus_no_underline');
  });
  it('over', function () {
    assert.equal(h.toElmName(h.fixClass('.w-1\\/2')), 'w_1over2');
  });
  it('negative', function () {
    assert.equal(h.toElmName(h.fixClass('.-m-1')), 'neg_m_1');
  });
  it('negative with variant', function () {
    assert.equal(h.toElmName(h.fixClass('.sm\:-m-24')), 'sm_neg_m_24');
  });
  it('with prefix', function () {
    assert.equal(h.toElmName(h.fixClass('.hover\:tw-bg-blue-500:hover')), 'hover_tw_bg_blue_500');
  });
  it('negative with prefix', function () {
    assert.equal(h.toElmName(h.fixClass('.tw-m-1')), 'tw_neg_m_1');
  });
});
