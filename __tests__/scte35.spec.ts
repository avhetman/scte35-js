/**
 * Copyright 2018 Comcast Cable Communications Management, LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or   implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { expect } from "chai";
import { SCTE35 } from "../src/scte35";
require("../util/dom-shim.js")

describe("SCTE35", () => {

    const scte35: SCTE35 = new SCTE35();

    it("should parse from base64", () => {
        const base64 = "/DBGAAET8J+pAP/wBQb+AAAAAAAwAi5DVUVJQAErgX+/CR9TSUdOQUw6OGlTdzllUWlGVndBQUFBQUFBQUJCQT09NwMDaJ6RZQ==";
        const spliceInfo = scte35.parseFromB64(base64);
        // Confirms that all 33 bits are read correctly
        expect(spliceInfo.ptsAdjustment).to.eq(4629503913);
    });

    it("should parse from base64", () => {
        const base64 = "/DBGAAET8J+pAP/wBQb+AAAAAAAwAi5DVUVJQAErgX+/CR9TSUdOQUw6OGlTdzllUWlGVndBQUFBQUFBQUJCQT09NwMDaJ6RZQ==";
        const spliceInfo = scte35.parseFromB64(base64);
        // TODO: expect
    });

    it("should parse from base64", () => {
        const base64 = "/DBoAAFDizjpAP/wBQb/ebGh8wBSAhhDVUVJXAJwnn+3AQlIREkwMzA0MDghAQACGkNVRUlcAnC6f/cAAZUdEwEGUFMxODgxNAAAAhpDVUVJXAJwu3/3AAApMbEBBlBTMTg4MTAAABLEqgg=";
        const spliceInfo = scte35.parseFromB64(base64);
        // Confirms that all 33 bits are read correctly
        expect(spliceInfo.ptsAdjustment).to.eq(5428164841);
    });

    it("should parse from base64", () => {
        const base64 = "/DBvAAFDizjpAP/wBQb+K9F+MgBZAhlDVUVJXAL02n+3AQpIRDExMjM0OFQxIQEAAh1DVUVJXAL2U3/3AAGb/KUBCUhEQ00xMDY0ODQAAAIdQ1VFSVwC9lR/9wAAKTGxAQlIRENNMTA2NDgwAADHDHPR";
        const spliceInfo = scte35.parseFromB64(base64);
        // TODO: expect
    });

    it("should parse from base64", () => {
        const base64 = "/DBpAAFDizjpAP/wBQb+MSGYXQBTAhdDVUVJXBGNE3+3AQhIRFRQMTg3OTEBAAIYQ1VFSVwRin9/twEJSERDTTExMDczNQAAAh5DVUVJXBGNMX/3AAI4g+0BCkhEMTA4NTExVDQgAQAvzOfd";
        const spliceInfo = scte35.parseFromB64(base64);
        // TODO: expect
    });

    it("should parse from hex", () => {
        const base64 = "fc3046000113f09fa900fff00506fe000000000030022e4355454940012b817fbf091f5349474e414c3a386953773965516946567741414141414141414242413d3d370303689e9165";
        const spliceInfo = scte35.parseFromHex(base64);
        // Confirms that all 33 bits are read correctly
        expect(spliceInfo.ptsAdjustment).to.eq(4629503913);
    });

    it("should parse splice_insert correctly", () => {
        const hex = "/DAlAAAAAAAAAP/wFAUAAqbVf+/+AAAAAH4AUmXAAAAAAAAAdIQsGg==";
        const spliceInfo = scte35.parseFromB64(hex);
        expect((spliceInfo.spliceCommand as any).spliceTime.specified).to.eql(true);
        expect((spliceInfo.spliceCommand as any).breakDuration.duration).to.eql(5400000);
    });

    it("should parse two descriptors", () => {
        const base64 = "/DBfAAHsGNoe///wBQb+F08gCQBJAhxDVUVJxHIBUX//AAEgwfgICAAFH4HEcgFRNAIDAilDVUVJAAAAAH+/DBpWTU5VAV/G7ALs/RHgrKYAJrlBTzABAAAAAAEAAH2eFFg=";
        const spliceInfo = scte35.parseFromB64(base64);
        expect(spliceInfo.descriptors).to.not.be.undefined;
        expect(spliceInfo.descriptors!.length).to.eq(2);
    });

});
