import React from 'react';
import OwlCarousel from 'react-owl-carousel2';
import '../../css/App.css';

import PH from './blank-img.jpg'; // Placeholder Image

import { globalStyles } from '../globalStyles.js';

export default class Spin extends React.Component {

  handleVideoClick = (e) => {
    e.stopPropagation();    
    e.currentTarget.parentNode.parentNode.style.borderBottom = '3px solid #ffef00';
    this.props.handleDefaultHistory(e,this.props.spinVideos);    
  }

  handleVideoHover = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.querySelector('.VideoOverlay').style.display = 'flex';
  }

  handleVideoLeave = (e) => {
    e.preventDefault();    
    e.stopPropagation();
    e.currentTarget.querySelector('.VideoOverlay').style.display = 'none';
  }

  render() {
    let channelItems = this.props.spinVideos.map((item, index) => {
      let videoImage = this.props.getYoutubeThumbnail(item.snippet.thumbnails);
      return (
        <div 
          style={globalStyles.ThumbnailBackground} 
          className="Videos owl-lazy" 
          key={item.id}
          data-src={videoImage}
          data-index={index} 
          data-video={item.id} 
          onMouseOver={this.handleVideoHover} 
          onMouseLeave={this.handleVideoLeave}>
            <img src={PH} alt="placeholder for disc golf video" style={{visibility: 'hidden'}} />
            <div style={globalStyles.VideoOverlayStyle} className="VideoOverlay">
              <span onClick={this.handleVideoClick}>
                <i className="fa fa-play-circle" aria-hidden="true"></i>
              </span>
              <span onClick={(e) => this.props.handleDefaultBookMark(e,this.props.spinVideos)}><i className="fa fa-bookmark" aria-hidden="true"></i></span>
              <span onClick={(e) => this.props.handleDefaultFavorite(e,this.props.spinVideos)}><i className="fa fa-heart" aria-hidden="true"></i></span>
            </div>
        </div>
      )
    });
    return (
      <div style={globalStyles.marginTop} id="Spin">
        <div>
          <div style={globalStyles.ChannelTitle}>
            Spin Tv
            <a href="https://www.youtube.com/subscription_center?add_user=TheSpinTVcom" target="_blank" rel="noopener noreferrer" style={globalStyles.ChannelLink}>
              <div style={globalStyles.SubscribeBtn}>Follow</div>
            </a>
          </div>
        </div>
        <div className="video-grid">
        {this.props.spinVideos.length && <OwlCarousel ref="spin" options={globalStyles.owlOptions}>
          {channelItems}
        </OwlCarousel>}
        </div>
      </div>
    );
  }
}