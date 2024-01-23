"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import { usePathname } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import Nav from "./nav";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Rounded from "../../common/RoundedButton";
import Magnetic from "../../common/Magnetic";

export default function index() {
  const header = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const pathname = usePathname();
  const button = useRef(null);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    if (isActive) setIsActive(false);

    const handleResize = () => {
      setIsMounted(window.innerWidth >= 767);
    };
    // Initial check on component mount
    handleResize();

    // Add resize event listener
    window.addEventListener("resize", handleResize);
    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [pathname]);

  useLayoutEffect(() => {
    const isDesktop = window.innerWidth >= 767;

    if (isDesktop) {
      gsap.registerPlugin(ScrollTrigger);
      gsap.to(button.current, {
        scrollTrigger: {
          trigger: document.documentElement,
          start: 0,
          end: window.innerHeight / 2,
          onLeave: () => {
            gsap.to(button.current, {
              scale: 1,
              duration: 0.25,
              ease: "power1.out",
            });
          },
          onEnterBack: () => {
            gsap.to(
              button.current,
              { scale: 0, duration: 0.25, ease: "power1.out" },
              setIsActive(false)
            );
          },
        },
      });
    } 
  }, []);

  return (
    <>
      <div ref={header} className={styles.header}>
        <div className={styles.logo}>
          <p className={styles.copyright}>©</p>
          <div className={styles.name}>
            <p className={styles.codeBy}>Code by</p>
            <p className={styles.dev}>Dev</p>
            <p className={styles.madaan}>Madaan</p>
          </div>
        </div>
        <div>
          {isMounted ? (
            <div className={styles.nav}>
              <Magnetic>
                <div className={styles.el}>
                  <a>Work</a>
                  <div className={styles.indicator}></div>
                </div>
              </Magnetic>
              <Magnetic>
                <div className={styles.el}>
                  <a>About</a>
                  <div className={styles.indicator}></div>
                </div>
              </Magnetic>
              <Magnetic>
                <div className={styles.el}>
                  <a>Contact</a>
                  <div className={styles.indicator}></div>
                </div>
              </Magnetic>
            </div>
          ) : null
          }
        </div>
      </div>
      <div ref={button} className={styles.headerButtonContainer}>
        <Rounded
          onClick={() => {
            setIsActive(!isActive);
          }}
          className={`${styles.button}`}
        >
          <div
            className={`${styles.burger} ${isActive ? styles.burgerActive : ""
              }`}
          ></div>
        </Rounded>
      </div>
      <AnimatePresence mode="wait">{isActive && <Nav />}</AnimatePresence>
    </>
  );
}
