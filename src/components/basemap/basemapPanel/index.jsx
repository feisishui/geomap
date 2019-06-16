import React from 'react';
import { Row, Col } from 'antd';
import styles from './index.less';
import * as mapUtils from '../../../utils/arcgis/map/mapviewUtil';

const BaseMapPanel = props => {
  function switchBmap(e) {
    const view = window.agsGlobal.view;
    const itemId = e.target.dataset.itemid;
    // 通过webmap的id切换底图
    mapUtils.switchBaseMapByWebmapId(view, itemId);
    props.setBmapIcon(e.target.src);
    props.hide();
  }
  function renderBmapList() {
    return window.basemapConfig.map(item => {
      return (
        <Col span={12} key={item.itemId}>
          <div className={styles.basemapitemwrap}>
            <img
              onClick={switchBmap}
              data-itemid={item.itemId}
              title={item.title}
              src={item.icon}
            />
            <center>
              <span>{item.title}</span>
            </center>
          </div>
        </Col>
      );
    });
  }

  return (
    <div
      className={styles.BaseMapPanelWrap}
      style={{ display: props.show ? 'block' : 'none' }}
    >
      <Row gutter={10} style={{ margin: 10 }}>
        {renderBmapList()}{' '}
      </Row>
    </div>
  );
};

export default BaseMapPanel;
