import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Dropdowns } from '../dropdown';
import dashboardImg from 'assets/img/icons/Arrow.svg';
import salesImg from 'assets/img/icons/Sales.svg';
import learnImg from 'assets/img/icons/Learn.svg';
import s from './littleMenu.module.scss';
import hideBtn from 'assets/img/icons/hideBtn.svg'

/**
* @typedef {{
*    item: string;
*    href?: string;
*    eventKey?: string;
*    active?: boolean;
*    itemAs?: 'button' | 'text';
* } | { hr: boolean }} TItems

/**
 * @typedef {{
 *  dashboard: TItems[];
 *  dashboadOnSelect: () => void
 *  sales: TItems[];
 *  salesOnSelect: () => void;
 *  learns: TItems[];
 *  learnsOnSelect: () => void;  
 * }} LittleMenuProps
 */

/**
 * 
 * @param {LittleMenuProps} props 
 * @returns {React.ReactNode}
 */

export const LittleMenu = ({ dashboard, dashboadOnSelect, sales, salesOnSelect, learns, learnsOnSelect }) => {
    return (
        <Container>
            <Row>
                <Col md={12} lg={12}>
                    <div className={s.hideBtn}>
                        <img src={hideBtn} />
                    </div>
                    <Dropdowns type={'littleMenu'} items={dashboard} title={'Дашбоарды'} onSelect={dashboadOnSelect} img={dashboardImg} />
                    <div className={s.LittleMenuLine}>
                        <span>Cервисы</span><hr />
                    </div>
                    <Dropdowns type={'littleMenu'} items={sales} title={'Аналитика продаж'} onSelect={salesOnSelect} img={salesImg} />
                    <Dropdowns type={'littleMenu'} items={learns} title={'Аналитика обучения'} onSelect={learnsOnSelect} img={learnImg} />
                </Col>
            </Row>
        </Container>
    )
}
