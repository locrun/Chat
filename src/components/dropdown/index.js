import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';

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
 *    type: 'dropdownBtnCode' | 'btnVariantCode' | 'splitBtnCode' | 'littleMenu';
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
 *    img: string;
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
  onSelect,
  img
}) => {
  const [dropdown, setDropdown] = useState(null);
  const [dropdownWidth, setDropdownWidth] = useState(undefined);
  // const [itemsHeight, setItemsHeight] = useState(undefined);
  const [randId] = useState(Math.random().toString(36).slice(2)); // to do a unique ID for dropdown

  React.useEffect(() => {
    switch (type) {
      case 'dropdownBtnCode':
        setDropdown(
          <DropdownButton
            onSelect={onSelect}
            id={randId}
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
                    style={{ width: dropdownWidth }}
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
                return <Dropdown.Divider key={elm.item} />;
              } else {
                if (elm.itemAs === 'text')
                  return <Dropdown.ItemText>{elm.item}</Dropdown.ItemText>;
                if (elm.active) {
                  return (
                    <Dropdown.Item
                      key={elm.item}
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
                      key={elm.item}
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
      case 'littleMenu':
        setDropdown(
          <DropdownButton
            onSelect={onSelect}
            as={'div'}
            id="little-menu"
            title={
              <div className={s.LittleMenuTitle}>
                {img && <img src={img} />} <span>{title}</span>
              </div>
            }
            className={cn(
              s.Dropdown,
              s.LittleMenu,
              'border-0 container-fluid radius-0'
            )}
          >
            {items.map(elm => {
              if (elm.active) {
                return (
                  <Dropdown.Item
                    key={elm.item}
                    className={s.LittleMenuItem}
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
                    key={elm.item}
                    className={s.LittleMenuItem}
                    as={elm.itemAs}
                    href={elm.href}
                    eventKey={elm.eventKey}
                  >
                    {elm.item}
                  </Dropdown.Item>
                );
              }
            })}
          </DropdownButton>
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
    /**
     * For the seat width of dropdown items, consider the width of the dropdown button.
     */
    setDropdownWidth(document.getElementById(randId)?.offsetWidth);
    const elm = document.querySelector('div[aria-labelledby="' + randId + '"]');
    if (elm) {
      elm.style.width = dropdownWidth + 'px';
      elm.style.minWidth = '50px';
    }
  }, [dropdownWidth, dropdown, randId]);

  return dropdown;
};
Title.propTypes = {
  title: PropTypes.string,
  quantity: PropTypes.string
};

export { Dropdowns };
