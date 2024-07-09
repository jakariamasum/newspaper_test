"use client";
import React from 'react';

interface WeatheTexProps {
  id: string;
  loc?: string;
  type?: 'horizontal' | 'responsive' | 'ticker';
  lang?: string;
  temperature?: 'fahrenheit' | 'celsius';
  backgroundColor?: string;
  fontColor?: string;
  cloudColor?: string;
  perspectiveColor?: string;
  sunColor?: string;
  moonColor?: string;
  thunderColor?: string;
}

const WeatheTex: React.FC<WeatheTexProps> = ({
  id,
  loc = 'auto',
  type = 'horizontal',
  lang = 'en',
  temperature = 'fahrenheit',
  backgroundColor = '#FFFFFF00',
  fontColor = 'rgba(255,255,255,1)',
  cloudColor = '#d4d4d4',
  perspectiveColor = '#2196F3',
  sunColor = '#FFC107',
  moonColor = '#FFC107',
  thunderColor = '#FF5722',
}) => {
  const widgetScript = `
    <div id="${id}" v='1.3' loc='${loc}' a='{
      "t":"${type}",
      "lang":"${lang}",
      "sl_lpl":1,
      "ids":[],
      "font":"Arial",
      "sl_ics":"one",
      "sl_sot":"${temperature}",
      "cl_bkg":"${backgroundColor}",
      "cl_font":"${fontColor}",
      "cl_cloud":"${cloudColor}",
      "cl_persp":"${perspectiveColor}",
      "cl_sun":"${sunColor}",
      "cl_moon":"${moonColor}",
      "cl_thund":"${thunderColor}"
    }'>
      <a href="https://weatherwidget.org/" id="${id}_u" className="hidden" target="_blank">
      Widget weather HTML
      </a>
    </div>
    <script async src="https://app2.weatherwidget.org/js/?id=${id}"></script>
  `;

  return (
    <div className="weather-widget w-full" dangerouslySetInnerHTML={{ __html: widgetScript }} />
  );
};

export default WeatheTex;
