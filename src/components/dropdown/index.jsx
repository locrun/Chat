import React, { FC, useState } from 'react';
import { nanoid } from 'nanoid'
import * as ReactBootstrap from 'react-bootstrap';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live';
import { Dropdown, DropdownButton, SplitButton } from 'react-bootstrap';


/**
* @typedef {{
*    item: string;
*    href?: string;
*    eventKey?: string;
*    active?: boolean;
*    itemAs?: 'button' | 'text';
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
* }} DropdownsProps
*/

/**
 * Компонент Dropdowns.
 * 
 * @param {DropdownsProps} props - Свойства компонента.
 * @returns {React.ReactNode} - Возвращает узел React.
 */

const Dropdowns = ({ type, items, ButtonGroup, variant = 'falcon-default', sizing, direction, header, align, title }) => {
    const [dropdown, setDropdown] = useState(null)
    React.useEffect(() => {
        switch (type) {
            case 'dropdownBtnCode': setDropdown(
                <DropdownButton
                    id="dropdown-basic-button"
                    title="Dropdown button"
                    variant='falcon-default'

                >
                    {header && <Dropdown.Header>{header}</Dropdown.Header>}
                    {
                        items.map(elm => {
                            if ('href' in elm) {
                                return <Dropdown.Item key={nanoid()} href={elm.href}>{elm.item}</Dropdown.Item>
                            } else if ('hr' in elm) {
                                return <Dropdown.Divider key={nanoid()} />
                            } else return
                        })
                    }
                </DropdownButton>
            ); break;
            case 'btnVariantCode': setDropdown(
                <DropdownButton
                    as={ButtonGroup}
                    key={variant}
                    id={'dropdown-variants-' + variant}
                    variant={variant?.toLowerCase()}
                    title={title}
                    size={
                        sizing == 'Large Button' ? 'lg' : sizing == 'Small Button' ? 'sm' : undefined
                    }
                    className={
                        sizing == 'Large Button' || sizing == 'Regular Button' ? 'me-2 mb-1' : 'mb-1'
                    }
                    drop={direction}
                    align={align}
                >
                    {header && <Dropdown.Header>{header}</Dropdown.Header>}
                    {items.map(elm => {
                        if ('hr' in elm) {
                            return <Dropdown.Divider key={nanoid()} />
                        } else {
                            if (elm.itemAs === 'text') return <Dropdown.ItemText key={nanoid()}>{elm.item}</Dropdown.ItemText>
                            if (elm.active) {
                                return <Dropdown.Item key={nanoid()} as={elm.itemAs} href={elm.href} eventKey={elm.eventKey} active>{elm.item}</Dropdown.Item>
                            } else {
                                return <Dropdown.Item key={nanoid()} as={elm.itemAs} href={elm.href} eventKey={elm.eventKey} >{elm.item}</Dropdown.Item>
                            }

                        }
                    })}
                </DropdownButton>
            ); break;
            case 'splitBtnCode': setDropdown(
                <SplitButton
                    as={ButtonGroup}
                    key={variant}
                    id={'dropdown-variants-' + variant}
                    variant={variant?.toLowerCase()}
                    title={title}
                    size={
                        sizing == 'Large Button' ? 'lg' : sizing == 'Small Button' ? 'sm' : undefined
                    }
                    className={
                        sizing == 'Large Button' || sizing == 'Regular Button' ? 'me-2 mb-1' : 'mb-1'
                    }
                    drop={direction}
                    align={align}
                >
                    {header && <Dropdown.Header>{header}</Dropdown.Header>}
                    {items.map(elm => {
                        if ('hr' in elm) {
                            return <Dropdown.Divider />
                        } else {
                            if (elm.itemAs === 'text') return <Dropdown.ItemText>{elm.item}</Dropdown.ItemText>
                            if (elm.active) {
                                return <Dropdown.Item as={elm.itemAs} href={elm.href} eventKey={elm.eventKey} active>{elm.item}</Dropdown.Item>
                            } else {
                                return <Dropdown.Item as={elm.itemAs} href={elm.href} eventKey={elm.eventKey} >{elm.item}</Dropdown.Item>
                            }
                        }
                    })}
                </SplitButton>
            ); break;
        }
    }, [type, items, ButtonGroup, variant, sizing, direction, header, align, title])
    return dropdown
}

export { Dropdowns };
/*export type { TItems }*/
