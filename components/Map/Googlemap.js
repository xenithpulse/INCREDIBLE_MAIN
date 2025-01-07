// components/GoogleMap.js
import React from "react";
import styled from "styled-components";
import Center from "@/homecenter";

const MapContainer = styled.div`
  width: 100%;
  padding: 20px 0;
  display: flex;
  justify-content: center;
  margin-top: 30px;

  iframe {
    width: 100%;
    border: 0;

    @media (min-width: 640px) {
      width: 90%;
      height: 150px;
    }

    @media (min-width: 1024px) {
      width: 80%;
      height: 500px;
    }
  }
`;

const GoogleMap = () => {
  return (
    <Center>
    <MapContainer>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3399.839628147441!2d74.41294871194896!3d31.556015574090033!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39190f933643ec87%3A0xc3b796638c6b4e4d!2sProducts%20Inn!5e0!3m2!1sen!2s!4v1734345986310!5m2!1sen!2s"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </MapContainer>
    </Center>
  );
};

export default GoogleMap;
