import React from 'react';
import * as ReactBootstrap from 'react-bootstrap';
import { Button, Row, Col } from 'react-bootstrap';

import { Dropdowns } from 'components/dropdown';

const Example = () => {

  const DROPDOWNITEMS/*: TItems[]*/ = [
    { item: 'Link 1', href: 'google.com', active: true },
    { item: 'Custom Text', eventKey: '1', itemAs: 'button' },
    { hr: true },
    { item: 'Text', itemAs: 'text' },
    { item: 'Another Text', eventKey: '2', itemAs: 'button' },
  ];

  return (
    <div>
      <Row className="g-lg-3 bg-white p-3 rounded">
        <Col lg={6}>
          <h2 className="mb-4">Dropwdown</h2>
          <h4 className='mb-1'>Dropwdown Button</h4>
          <Dropdowns type={'btnVariantCode'} items={DROPDOWNITEMS} title='Dropwdown Button' />
          <h4 className='mb-1'>Button Variant</h4>
          <Dropdowns type={'btnVariantCode'} items={DROPDOWNITEMS} title='Primary' variant={'Primary'} />
          <Dropdowns type={'btnVariantCode'} items={DROPDOWNITEMS} title='Secondary' variant={'Secondary'} />
          <Dropdowns type={'btnVariantCode'} items={DROPDOWNITEMS} title='Success' variant={'Success'} />
          <Dropdowns type={'btnVariantCode'} items={DROPDOWNITEMS} title='Info' variant={'Info'} />
          <Dropdowns type={'btnVariantCode'} items={DROPDOWNITEMS} title='Warning' variant={'Warning'} />
          <Dropdowns type={'btnVariantCode'} items={DROPDOWNITEMS} title='Danger' variant={'Danger'} />
          <Dropdowns type={'btnVariantCode'} items={DROPDOWNITEMS} title='Light' variant={'Light'} />
          <Dropdowns type={'btnVariantCode'} items={DROPDOWNITEMS} title='Dark' variant={'Dark'} />
          <h4 className='mb-1'>Split Button Code</h4>
          <Dropdowns type={'splitBtnCode'} items={DROPDOWNITEMS} title='Split Button' />
          <h4 className='mb-1'>Sizing</h4>
          <Dropdowns type={'btnVariantCode'} items={DROPDOWNITEMS} title='Large Button' sizing={'Large Button'} />
          <Dropdowns type={'btnVariantCode'} items={DROPDOWNITEMS} title='Regular Button' />
          <Dropdowns type={'btnVariantCode'} items={DROPDOWNITEMS} title='Small Button' sizing={'Small Button'} />
          <h4 className='mb-1'>Directions</h4>
          <Dropdowns type={'btnVariantCode'} items={DROPDOWNITEMS} title='Dropup' direction={'up'} />
          <Dropdowns type={'btnVariantCode'} items={DROPDOWNITEMS} title='Dropdown' direction={'down'} />
          <Dropdowns type={'btnVariantCode'} items={DROPDOWNITEMS} title='Dropstart' direction={'start'} />
          <Dropdowns type={'btnVariantCode'} items={DROPDOWNITEMS} title='Dropend' direction={'end'} />
          <h4 className='mb-1'>Menu alignment</h4>
          <Dropdowns type={'btnVariantCode'} items={DROPDOWNITEMS} title='Left aligned' align={'start'} />
          <Dropdowns type={'btnVariantCode'} items={DROPDOWNITEMS} title='Right aligned' align={'end'} />
          <h4 className='mb-1'>Dropwdown Headers</h4>
          <Dropdowns type={'btnVariantCode'} items={DROPDOWNITEMS} title='Dropwdown Button' header={'Dropdown Header'} />
        </Col>
      </Row>
    </div>
  );
};

export default Example;
