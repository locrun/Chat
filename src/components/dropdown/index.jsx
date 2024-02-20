import React, { FC, useState } from 'react';
import { nanoid } from 'nanoid';
import * as ReactBootstrap from 'react-bootstrap';
import s from './dropdown.module.scss';
import cn from 'classnames';
import { Dropdown, DropdownButton, SplitButton } from 'react-bootstrap';

const Title = ({ title, quantity }) => {
  return (
    <div className={cn('text-12', s.btn_title_wrapp)}>
      {title}
      {quantity && <div className={s.btn_title_quantity}>{quantity}</div>}
    </div>
  );
};

/**
 * @typedef {{
 *    item: string;
 *    href?: string;
 *    eventKey?: string;
 *    active?: boolean;
 *    itemAs?: 'button' | 'text';
 *    quantity: number;
 * } | { hr: boolean }} TItems
 */

/**
 * @typedef {{
 *    type: 'dropdownBtnCode' | 'btnVariantCode' | 'splitBtnCode';
 *    items: TItems[];
 *    ButtonGroup?: 'a' | 'div' | 'span';
 *    variant?: 'Primary' | 'Secondary' | 'falcon-default' | 'Success' | 'Info' | 'Warning' | 'Danger' | 'Light' | 'Dark';
 *    sizing: 'Large Button' | 'Regular Button' | 'Small Button';
 *    direction: 'up' | 'down' | 'start' | 'end';
 *    header?: string;
 *    align?: { lg: 'start' } | { lg: 'end' };
 *    title: string;
 *    quantity: number;
 *    onSelect: () => void;
 * }} DropdownsProps
 */

/**
 * Компонент Dropdowns.
 *
 * @param {DropdownsProps} props - Свойства компонента.
 * @returns {React.ReactNode} - Возвращает узел React.
 */

const Dropdowns = ({
  type,
  items,
  ButtonGroup,
  variant = 'falcon-default',
  sizing,
  direction,
  header,
  align,
  title,
  quantity,
  onSelect
}) => {
  const [dropdown, setDropdown] = useState(null);
  const [dropdownWidth, setDropdownWidth] = useState(undefined);
  React.useEffect(() => {
    switch (type) {
      case 'dropdownBtnCode':
        setDropdown(
          <DropdownButton
            onSelect={onSelect}
            id="dropdown-basic-button"
            title={<Title title={title} quantity={quantity} />}
            variant="falcon-default"
            className={cn(s.Dropdown, 'border-0 container-fluid')}
          >
            {header && <Dropdown.Header>{header}</Dropdown.Header>}
            {items.map(elm => {
              if (!('hr' in elm)) {
                return (
                  <Dropdown.Item
                    key={nanoid()}
                    href={elm.href}
                    eventKey={elm.eventKey}
                    itemsAs={elm.itemAs}
                    active={elm.active}
                    className="pt-0 pb-0"
                  >
                    <div className="d-flex justify-content-between pt-0 pb-0">
                      <span className={s.items_conent}>{elm.item}</span>
                      <span className={s.items_number}>{elm?.quantity}</span>
                    </div>
                    <hr className={s.item_hr} />
                  </Dropdown.Item>
                );
              }
            })}
            <div style={{ width: dropdownWidth, padding: 0, margin: 0 }}></div>
          </DropdownButton>
        );
        break;
      case 'btnVariantCode':
        setDropdown(
          <DropdownButton
            onSelect={onSelect}
            as={ButtonGroup}
            key={variant}
            id={'dropdown-variants-' + variant}
            variant={variant?.toLowerCase()}
            title={title}
            size={
              sizing == 'Large Button'
                ? 'lg'
                : sizing == 'Small Button'
                ? 'sm'
                : undefined
            }
            className={
              sizing == 'Large Button' || sizing == 'Regular Button'
                ? 'me-2 mb-1'
                : 'mb-1'
            }
            drop={direction}
            align={align}
          >
            {header && <Dropdown.Header>{header}</Dropdown.Header>}
            {items.map(elm => {
              if ('hr' in elm) {
                return <Dropdown.Divider key={nanoid()} />;
              } else {
                if (elm.itemAs === 'text')
                  return (
                    <Dropdown.ItemText key={nanoid()}>
                      {elm.item}
                    </Dropdown.ItemText>
                  );
                if (elm.active) {
                  return (
                    <Dropdown.Item
                      key={nanoid()}
                      as={elm.itemAs}
                      href={elm.href}
                      eventKey={elm.eventKey}
                      active
                    >
                      {elm.item}
                    </Dropdown.Item>
                  );
                } else {
                  return (
                    <Dropdown.Item
                      key={nanoid()}
                      as={elm.itemAs}
                      href={elm.href}
                      eventKey={elm.eventKey}
                    >
                      {elm.item}
                    </Dropdown.Item>
                  );
                }
              }
            })}
          </DropdownButton>
        );
        break;
      case 'splitBtnCode':
        setDropdown(
          <SplitButton
            onSelect={onSelect}
            as={ButtonGroup}
            key={variant}
            id={'dropdown-variants-' + variant}
            variant={variant?.toLowerCase()}
            title={title}
            size={
              sizing == 'Large Button'
                ? 'lg'
                : sizing == 'Small Button'
                ? 'sm'
                : undefined
            }
            className={
              sizing == 'Large Button' || sizing == 'Regular Button'
                ? 'me-2 mb-1'
                : 'mb-1'
            }
            drop={direction}
            align={align}
          >
            {header && <Dropdown.Header>{header}</Dropdown.Header>}
            {items.map(elm => {
              if ('hr' in elm) {
                return <Dropdown.Divider />;
              } else {
                if (elm.itemAs === 'text')
                  return <Dropdown.ItemText>{elm.item}</Dropdown.ItemText>;
                if (elm.active) {
                  return (
                    <Dropdown.Item
                      as={elm.itemAs}
                      href={elm.href}
                      eventKey={elm.eventKey}
                      active
                    >
                      {elm.item}
                    </Dropdown.Item>
                  );
                } else {
                  return (
                    <Dropdown.Item
                      as={elm.itemAs}
                      href={elm.href}
                      eventKey={elm.eventKey}
                    >
                      {elm.item}
                    </Dropdown.Item>
                  );
                }
              }
            })}
          </SplitButton>
        );
        break;
    }
  }, [
    type,
    items,
    ButtonGroup,
    variant,
    sizing,
    direction,
    header,
    align,
    title,
    dropdownWidth
  ]);

  React.useEffect(() => {
    setDropdownWidth(
      document.getElementById('dropdown-basic-button')?.offsetWidth
    );
  }, [dropdownWidth, dropdown]);

  return dropdown;
};

export { Dropdowns };
