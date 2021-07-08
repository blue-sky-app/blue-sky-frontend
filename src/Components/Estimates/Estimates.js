import React from "react";
import { MobileNavBar } from "../NavBar/MobileNavBar";
import { BrowserNavBar } from "../NavBar/BrowserNavBar";
import { BrowserView, MobileView } from "react-device-detect";

export function Estimates() {
  return (
    <>
      <BrowserView>
        <BrowserNavBar />
          <h1> This is rendered only in browser </h1>
      </BrowserView>
      <MobileView>
        <MobileNavBar />
          <h1> This is rendered only on mobile </h1>
      </MobileView>
    </>
  )
}