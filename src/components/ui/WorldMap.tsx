"use client";

import { useEffect, useState, useRef } from "react";
import * as d3 from "d3";
import * as topojson from "topojson-client";

interface Position {
  x: number;
  y: number;
}

interface CountryFeature {
  type: string;
  properties: {
    name: string;
    [key: string]: any;
  };
  geometry: {
    type: string;
    coordinates: any;
  };
}

export default function WorldMap() {
  const ref = useRef<SVGSVGElement | null>(null);
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });

  useEffect(() => {
    const svg = d3.select(ref.current);
    const container = svg.node()?.parentElement;
    if (!container) return;

    const resize = () => {
      const width = container.clientWidth;
      const height = width * 0.55; // maintain aspect ratio

      svg.attr("width", width).attr("height", height);
      svg.selectAll("*").remove(); // clear before redraw

      const projection = d3.geoNaturalEarth1()
        .scale(width / 6)
        .translate([width / 2, height / 2]);

      const path = d3.geoPath(projection);

      d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json").then((data: any) => {
        const countries = (topojson.feature(data, data.objects.countries) as any)
          .features as CountryFeature[];

        svg.selectAll<SVGPathElement, CountryFeature>("path")
          .data(countries)
          .enter()
          .append("path")
          .attr("d", path as any)
          .attr("fill", "#74b9ff")
          .attr("stroke", "#fff")
          .attr("stroke-width", 0.5)
          .on("mouseover", function (event: MouseEvent, d: CountryFeature) {
            const name = d.properties.name || "Unknown";
            setHoveredCountry(name);
            setPosition({ x: event.pageX, y: event.pageY });
            d3.select(this).attr("fill", "#0984e3");
          })
          .on("mousemove", function (event: MouseEvent) {
            setPosition({ x: event.pageX, y: event.pageY });
          })
          .on("mouseout", function () {
            setHoveredCountry(null);
            d3.select(this).attr("fill", "#74b9ff");
          });
      });
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <div className="relative w-full overflow-hidden flex justify-center items-center">
      <svg ref={ref} className="block" />
      {hoveredCountry && (
        <div
          className="absolute bg-white text-xs sm:text-sm text-gray-800 px-2 py-1 rounded shadow-md pointer-events-none"
          style={{
            left: position.x + 10,
            top: position.y - 20,
          }}
        >
          {hoveredCountry}
        </div>
      )}
    </div>
  );
}
