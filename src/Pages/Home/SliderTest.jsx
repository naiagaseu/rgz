import React, { Component } from 'react';
import pic1 from './img/slider1.png'
import pic2 from './img/slider2.jpg';
import pic3 from './img/slider3.jpg'
import pic4 from './img/slider4.jpg';
import pic5 from './img/slider5.jpg';
import pic6 from './img/slider6.jpg'
import Slider from "react-slick";


  export default class PauseOnHover extends Component {
    render() {
      var settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true
      };
      return (
        <div>
          <p className='newsBlock'>свежие релизы</p>
          <Slider {...settings}>
            <div>
            <div className='slider'>
                <img src={pic1} className='pic' />
                <div className='text'>
                    <p className='nameMV'><span className='colorName'>LEE CHAEYEON</span> - KNOCK</p>
                    <p className='lyrics'>Knock, knock, knock</p>
                    <p className='lyrics2'>Knocking on your heart!</p>
                    <div className='goTo'>
                        <a href='https://www.youtube.com/watch?v=3sCZKrxCWMo' className='goToText'>посмотреть на YouTube</a>
                    </div>
                </div>
            </div>
            </div>
            <div>
            <div className='slider'>
                <img src={pic2} className='pic' />
                <div className='text'>
                    <p className='nameMV'><span className='colorName'>SEVENTEEN</span> - SUPER</p>
                    <p className='lyrics'>I luv my team</p>
                    <p className='lyrics2'>I luv my crew</p>
                    <div className='goTo'>
                        <a href='https://www.youtube.com/watch?v=-GQg25oP0S4' className='goToText'>посмотреть на YouTube</a>
                    </div>
                </div>
            </div>
            </div>
            <div>
            <div className='slider'>
                <img src={pic3} className='pic' />
                <div className='text'>
                    <p className='nameMV'><span className='colorName'>LE SSERAFIM</span> - UNFORFIVEN</p>
                    <p className='lyrics'>Unforgiven</p>
                    <p className='lyrics2'>Yes I was bleedin'</p>
                    <div className='goTo'>
                        <a href='https://www.youtube.com/watch?v=UBURTj20HXI' className='goToText'>посмотреть на YouTube</a>
                    </div>
                </div>
            </div>
            </div>
            <div>
            <div className='slider'>
                <img src={pic5} className='pic' />
                <div className='text'>
                    <p className='nameMV'><span className='colorName'>BTOB</span> - WIND AND WISH</p>
                    <p className='lyrics'>I still wish you the best</p>
                    <p className='lyrics2'>Cuz I love whenever you smile</p>
                    <div className='goTo'>
                        <a href='https://www.youtube.com/watch?v=zXOoza3sxiw' className='goToText'>посмотреть на YouTube</a>
                    </div>
                </div>
            </div>
            </div>
            <div>
            <div className='slider'>
                <img src={pic4} className='pic' />
                <div className='text'>
                    <p className='nameMV'><span className='colorName'>AESPA</span> - SPICY</p>
                    <p className='lyrics'>I'm too spicy</p>
                    <p className='lyrics2'>Too spicy</p>
                    <div className='goTo'>
                        <a href='https://www.youtube.com/watch?v=Os_heh8vPfs' className='goToText'>посмотреть на YouTube</a>
                    </div>
                </div>
            </div>
            </div>
            <div>
            <div className='slider'>
                <img src={pic6} className='pic' />
                <div className='text'>
                    <p className='nameMV'><span className='colorName'>DRIPPIN</span> - SEVEN SINS</p>
                    <p className='lyrics'>I don't even care</p>
                    <p className='lyrics2'>Do it again</p>
                    <div className='goTo'>
                        <a href='https://www.youtube.com/watch?v=qyUt4Yk4E04' className='goToText'>посмотреть на YouTube</a>
                    </div>
                </div>
            </div>
            </div>
          </Slider>
        </div>
      );
    }
  }