var test = require('tape');

// test('timing test', t => {
//     t.plan(2);

//     t.is(typeof Date.now, 'function');
//     t.deepEqual({x: 1}, {x: 1});

//     // setTimeout(function () {
//     //     t.is(101, 100, 'same');
//     // }, 0);
// });

// test('bar', async t => {
//     const bar = Promise.resolve('bar');

//     t.is(await bar, 'bar');
// });




import React from 'react';
import { shallow } from 'enzyme';
// import sinon from 'sinon';


import App from 'partials/App.js';
// test('<App />', () => {

  test('renders one H1', t => {
    t.plan(1);
    const wrapper = shallow(<App />);
    t.deepEqual(wrapper.find('h1').length, 1);
  });

  // it('renders an `.icon-star`', () => {
  //   const wrapper = shallow(<MyComponent />);
  //   expect(wrapper.find('.icon-star')).to.have.length(1);
  // });

  // it('renders children when passed in', () => {
  //   const wrapper = shallow(
  //     <MyComponent>
  //       <div className="unique" />
  //     </MyComponent>
  //   );
  //   expect(wrapper.contains(<div className="unique" />)).to.equal(true);
  // });

  // it('simulates click events', () => {
  //   const onButtonClick = sinon.spy();
  //   const wrapper = shallow(
  //     <Foo onButtonClick={onButtonClick} />
  //   );
  //   wrapper.find('button').simulate('click');
  //   expect(onButtonClick.calledOnce).to.equal(true);
  // });

// });
