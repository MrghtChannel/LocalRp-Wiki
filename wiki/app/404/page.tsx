'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/');
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div id="notfound">
      <style jsx>{`
        * {
          box-sizing: border-box;
        }
        body {
          padding: 0;
          margin: 0;
        }
        #notfound {
          position: relative;
          height: 100vh;
          background: #000000;
        }
        #notfound .notfound {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
        .notfound {
          max-width: 767px;
          width: 100%;
          line-height: 1.4;
          text-align: center;
        }
        .notfound .notfound-404 {
          position: relative;
          height: 180px;
          margin-bottom: 20px;
          z-index: -1;
        }
        .notfound .notfound-404 h1 {
          font-family: 'Montserrat', sans-serif;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          font-size: 224px;
          font-weight: 900;
          margin: 0;
          color: #000000;
          text-transform: uppercase;
          text-shadow: -1px -1px 0px #0082c3, 1px 1px 0px #39BEFF;
          letter-spacing: -20px;
        }
        .notfound .notfound-404 h2 {
          font-family: 'Montserrat', sans-serif;
          position: absolute;
          left: 0;
          right: 0;
          top: 110px;
          font-size: 42px;
          font-weight: 700;
          color: #fff;
          text-transform: uppercase;
          text-shadow: 0px 2px 0px #2D89B8;
          letter-spacing: 13px;
          margin: 0;
        }
        .notfound a {
          font-family: 'Montserrat', sans-serif;
          display: inline-block;
          text-transform: uppercase;
          color: #2D89B8;
          text-decoration: none;
          border: 2px solid;
          background: transparent;
          padding: 10px 40px;
          font-size: 14px;
          font-weight: 700;
          transition: 0.2s all;
        }
        .notfound a:hover {
          color: #2D89B8;
        }
        @media only screen and (max-width: 767px) {
          .notfound .notfound-404 h2 {
            font-size: 24px;
          }
        }
        @media only screen and (max-width: 480px) {
          .notfound .notfound-404 h1 {
            font-size: 182px;
          }
        }
      `}</style>
      <div className="notfound">
        <div className="notfound-404">
          <h1>404</h1>
          <h2>Page not found</h2>
        </div>
        <a href="/">Homepage</a>
      </div>
    </div>
  );
}
