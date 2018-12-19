import React from 'react';
import { connect } from 'dva';
// import { Icon } from 'antd';
import GeoSearch from '../components/search/GeoSearch';
import Trans3D from '../components/widgets/Trans3D';
import FullscreenButton from '../components/widgets/FullscreenButton';
import env from '../utils/env';
import styles from './index.css';
import Toolbar2D from '../components/toolbar/Toolbar2D';
import Toolbar3D from '../components/toolbar/Toolbar3D';
import Bookmark from '../components/bookmark/Bookmark';
import MapcorrectList from '../components/mapcorrect/MapcorrectList';
import LightshadowList from '../components/Lightshadow/LightshadowListTwo';
// import AreaSelector from '../components/stat/AreaSelector';
// function generateSigninUrl() {
//   const signUrl = env.getSigninUrl();
//   const clientId = env.getClientId();
//   const clientSecret = env.getClientSecret();
//   const callback = `${window.location.origin}${window.location.pathname}/login_callback.html`;
//   const returnUrl = encodeURIComponent(`${callback}?returnUrl=${window.location.href}`);

//   return `${signUrl}?returnUrl=${returnUrl}&client_id=${clientId}&client_secret=${clientSecret}`;
// }

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.viewDiv = null;
  }

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch({
      type: 'agsmap/init',
      payload: {
        container: this.viewDiv,
        basemap: env.getDefaultBasemap3D(),
        viewMode: this.props.agsmap.mode,
      },
    });

    // dispatch({
    //   type: 'agsmap/initsplitMap',
    //   payload: {
    //     container: this.viewsplitDiv,
    //     basemap: env.getDefaultBasemap3D(),
    //   },
    // });
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <div
          id="splitscreenDom"
          className={styles.viewsplitDiv}
          style={{
            display: this.props.agsmap.splitflags ? 'block' : 'none',
          }}
        />
        <div
          ref={node => {
            this.viewDiv = node;
          }}
          className={styles.viewDiv}
        >
          <Toolbar2D />
          <Toolbar3D />
          <Trans3D />
          <Bookmark />
          <MapcorrectList />
          <LightshadowList />
        </div>
        <GeoSearch />
        {/* <FullscreenButton/> */}
      </div>
    );
  }
}

export default connect(({ agsmap }) => {
  return {
    agsmap,
  };
})(IndexPage);
