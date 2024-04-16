// ==UserScript==
// @name         TON Fingerprints
// @namespace    http://fingerprints.ton
// @version      0.0.1g
// @description  A browser extension that allows you to display the TON Fingerprints collection on the Getgems NFT marketplace provides useful information about each NFT. For each Fingerprint, its recommended price, the degree of rarity and the DAO group to which it belongs are indicated. This information will help users better understand the value and uniqueness of each NFT, as well as make informed buying or selling decisions. The extension provides convenient access to Fingerprint information and helps users keep up to date with the latest trends and changes on the marketplace.
// @author       DAO Fingerprints
// @match        https://getgems.io/collection/fingerprints*
// @match        https://getgems.io/fingerprints*
// @match        https://getgems.io/user*
// @match        https://getgems.io/collection/EQATbIOeT9ziq7Jf76dJlnWIAiZggY2TeDteAh46D4QICBZj*
// @icon         https://raw.githubusercontent.com/mir-one/fingerprints/main/site/index_files/1.jpg
// @homepageURL  https://github.com/mir-one/fingerprints
// @updateURL    https://raw.githubusercontent.com/mir-one/fingerprints/main/Getgems.Fingerprints.user.js
// @downloadURL  https://raw.githubusercontent.com/mir-one/fingerprints/main/Getgems.Fingerprints.user.js
// @supportURL   https://github.com/mir-one/fingerprints/issues
// @grant        none
// ==/UserScript==

(function () {
    "use strict";
    let nfts = [];

    async function load() {
        const response = await fetch(
            `https://gist.githubusercontent.com/inozemtsev-roman/499d56624d7794b6297dcc265ab5526f/raw/9f12aa78ecea02f40110f1e6e223d9dbc80cbd32/fingerprints.json`
    );
      const result = await response.json();

      nfts = result;
      setTimeout(updateUI, 1000);
  }

    function updateUI() {
        const $subtitles = [...document.querySelectorAll(".NftPreview__title")];
        console.log(`Adding details to ${$subtitles.length} NFT`);
        for (const $subtitle of $subtitles) {
            if (
                !$subtitle.getAttribute("done") &&
                $subtitle.textContent.includes("Fingerprint #")
            ) {
                const idx = +$subtitle.textContent.replace("Fingerprint #", "");
                const { floor, rarityIndex, DAO, Tier } = nfts.find(
                    (nft) => nft.idx === idx
                );
                const rarityText = `R: ${rarityIndex}`;
                let p1 = document.createElement("p");
                p1.textContent = rarityText;
                p1.id = `custom__rarity`;
                let p2 = document.createElement("p");
                p2.id = `custom__floor`;
                p2.textContent = `RRP: ${floor} 💎`;
                let p3 = document.createElement("p");
                p3.id = `custom__text`;
                const rareWords = [];
                if (DAO === "thumb") rareWords.push(DAO);
                if (DAO === "index") rareWords.push(DAO);
                if (DAO === "middle") rareWords.push(DAO);
                if (DAO === "ring") rareWords.push(DAO);
                if (DAO === "pinkie") rareWords.push(DAO);
                if (Tier === "SECRET") rareWords.push(Tier);
                p3.textContent = rareWords.join(" ");
                insertAfter(p3, $subtitle);
                insertAfter(p2, $subtitle);
                insertAfter(p1, $subtitle);
                $subtitle.setAttribute("done", "true");
            }
        }
        setTimeout(updateUI, 1000);
    }

    function insertAfter(newNode, referenceNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }

    function addGlobalStyle(css) {
        let head, style;
        head = document.getElementsByTagName("head")[0];
        if (!head) {
            return;
        }
        style = document.createElement("style");
        style.type = "text/css";
        style.innerHTML = css;
        head.appendChild(style);
    }

    window.addEventListener("keydown", keydown);

    function keydown(event) {
        if (event.keyCode === 83) {
            const $wrapper = document.querySelector(".NftsList");
            const $all = [...document.querySelectorAll(".NftPreview__wrap")];
            const r = $all.sort((a, b) => {
                a =
                    +a.childNodes[0].childNodes[0].childNodes[1].childNodes[2]?.textContent.split(
                    " "
                )[0] || 0;
                b =
                    +b.childNodes[0].childNodes[0].childNodes[1].childNodes[2]?.textContent.split(
                    " "
                )[0] || 0;
                return b - a;
            });
            console.log({ r });
            $wrapper.innerHTML = "";
            for (let rr of r) $wrapper.append(rr);
        }
    }

    addGlobalStyle(`
    @media (max-width: 5000px) {
      .NftPreview__wrap {
        width: calc((100% - (16px * 7))/7);
      }
    @media (max-width: 1679px) {
      .NftPreview__wrap {
        width: calc((100% - (16px * 6))/6);
      }
    }
    @media (max-width: 1411px) {
      .NftPreview__wrap {
        width: calc((100% - (16px * 5))/5);
      }
    }
    @media (max-width: 1191px) {
      .NftPreview__wrap {
        width: calc((100% - (16px * 4))/4);
      }
    }
    @media (max-width: 1000px) {
      .NftPreview__wrap {
        width: calc((100% - (16px * 5)) / 5);
        #custom__rarity {
      position: absolute;
      top: -75px;
      left: 16px;
      text-align: left;
      font-size: 15px;
      color: #0098EA;
      font-weight: 600;
    }

    #custom__text {
      position: absolute;
      top: -55px;
      left: 16px;
      text-align: left;
      font-size: 14px;
      color: #0098EA;
      font-weight: 500;
      text-transform: capitalize;
    }

    #custom__floor {
      position: absolute;
      top: -30px;
      left: 16px;
      text-align: left;
      color: #E5E5E5;
      font-size: 15px;
      font-weight: 600;
      line-height: 18px;
      letter-spacing: -.006px;
    }
      }
    }

    .NftPreview__info {
      position: relative;
    }

    .LibraryCaption--l-1 {
    font-size: 10px;
    line-height: 18px;
    }

    .NftPreview__subtitle_text {
    overflow: hidden;
    max-width: 100%;
    font-size: 14px;
    text-overflow: ellipsis;
    white-space: nowrap;
    }

    .NftPreview__actions {
    position: absolute;
    right: 8px;
    top: 8px;
    bottom: calc(106px - 32px - 8px);
    }
    @media (max-width: 877px) {
      .NftPreview__wrap {
        width: calc((100% - (16px * 4)) / 4);
        #custom__rarity {
      position: absolute;
      top: -75px;
      left: 16px;
      text-align: left;
      font-size: 15px;
      color: #0098EA;
      font-weight: 600;
    }

    #custom__text {
      position: absolute;
      top: -55px;
      left: 16px;
      text-align: left;
      font-size: 14px;
      color: #0098EA;
      font-weight: 500;
      text-transform: capitalize;
    }

    #custom__floor {
      position: absolute;
      top: -30px;
      left: 16px;
      text-align: left;
      color: #E5E5E5;
      font-size: 15px;
      font-weight: 600;
      line-height: 18px;
      letter-spacing: -.006px;
    }
      }
    }

    .NftPreview__info {
      position: relative;
    }

    .LibraryCaption--l-1 {
    font-size: 10px;
    line-height: 18px;
    }

    .NftPreview__subtitle_text {
    overflow: hidden;
    max-width: 100%;
    font-size: 14px;
    text-overflow: ellipsis;
    white-space: nowrap;
    }

    .NftPreview__actions {
    position: absolute;
    right: 8px;
    top: 8px;
    bottom: calc(106px - 32px - 8px);
    }
    @media (max-width: 687px) {
      .NftPreview__wrap {
        width: calc((100% - (16px * 3)) / 3);
        #custom__rarity {
      position: absolute;
      top: -75px;
      left: 16px;
      text-align: left;
      font-size: 15px;
      color: #0098EA;
      font-weight: 600;
    }

    #custom__text {
      position: absolute;
      top: -55px;
      left: 16px;
      text-align: left;
      font-size: 14px;
      color: #0098EA;
      font-weight: 500;
      text-transform: capitalize;
    }

    #custom__floor {
      position: absolute;
      top: -30px;
      left: 16px;
      text-align: left;
      color: #E5E5E5;
      font-size: 15px;
      font-weight: 600;
      line-height: 18px;
      letter-spacing: -.006px;
    }
      }
    }

    .NftPreview__info {
      position: relative;
    }

    .LibraryCaption--l-1 {
    font-size: 10px;
    line-height: 18px;
    }

    .NftPreview__subtitle_text {
    overflow: hidden;
    max-width: 100%;
    font-size: 14px;
    text-overflow: ellipsis;
    white-space: nowrap;
    }

    .NftPreview__actions {
    position: absolute;
    right: 8px;
    top: 8px;
    bottom: calc(106px - 32px - 8px);
    }

    @media (max-width: 513px) {
      .NftPreview__wrap {
        width: calc((100% - (16px * 2)) / 2);
        #custom__rarity {
      position: absolute;
      top: -75px;
      left: 16px;
      text-align: left;
      font-size: 15px;
      color: #0098EA;
      font-weight: 600;
    }

    #custom__text {
      position: absolute;
      top: -55px;
      left: 16px;
      text-align: left;
      font-size: 14px;
      color: #0098EA;
      font-weight: 500;
      text-transform: capitalize;
    }

    #custom__floor {
      position: absolute;
      top: -30px;
      left: 16px;
      text-align: left;
      color: #E5E5E5;
      font-size: 18px;
      font-weight: 600;
      line-height: 15px;
      letter-spacing: -.006px;
    }
      }
    }

    .NftPreview__info {
      position: relative;
    }

    .LibraryCaption--l-1 {
    font-size: 10px;
    line-height: 18px;
    }

    .NftPreview__subtitle_text {
    overflow: hidden;
    max-width: 100%;
    font-size: 14px;
    text-overflow: ellipsis;
    white-space: nowrap;
    }

    .NftPreview__actions {
    position: absolute;
    right: 8px;
    top: 8px;
    bottom: calc(106px - 32px - 8px);
    }

    #custom__rarity {
      position: absolute;
      top: 12px;
      right: 16px;
      text-align: right;
      font-size: 15px;
      color: #0098EA;
      font-weight: 600;
    }

    #custom__text {
      position: absolute;
      top: 2.2rem;
      right: 16px;
      text-align: right;
      font-size: 14px;
      color: #0098EA;
      font-weight: 500;
      text-transform: capitalize;
    }

    #custom__floor {
      position: absolute;
      bottom: 1.1rem;
      right: 14px;
      text-align: right;
      color: #E5E5E5;
      font-size: 15px;
      font-weight: 600;
      line-height: 18px;
      letter-spacing: -.006px;
    }

    .NftPreview__wrap--no-bg .NftPreview__actions {
    right: 8px;
    }

    body[data-theme=dark] {
    --accents_accent: #2188ff;
    --background_content: #080a0b;
    }

    .Description {
    word-wrap: break-word;
    max-width: 1300px;
    }

    `);
    load();
})();
