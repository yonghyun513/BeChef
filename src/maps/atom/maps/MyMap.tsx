import React, { useEffect, useRef, useState } from "react";
import { BiTargetLock } from "react-icons/bi";

// Store 인터페이스 정의
interface Store {
  storeId: number;
  storeName: string;
  address: string;
  menuName: string;
  latitude: number;
  longitude: number;
}

const MyMap: React.FC<{ results: Store[] }> = ({ results }) => {
  const mapRef = useRef<HTMLDivElement>(null); // 지도 엘리먼트를 참조
  const [map, setMap] = useState<any>(null); // 지도 객체 상태
  const [markers, setMarkers] = useState<any[]>([]); // 마커 객체 상태
  const [infoWindow, setInfoWindow] = useState<any>(null); // 인포윈도우 객체 상태

  // 지도 초기화
  useEffect(() => {
    const { kakao } = window as any;
    if (!kakao) return;

    const container = mapRef.current; // 지도를 표시할 HTML 엘리먼트를 참조
    const options = {
      center: new kakao.maps.LatLng(37.489457, 126.7223953), // 지도 중심 좌표 설정
      level: 5, // 지도 확대 레벨 설정
    };
    const mapInstance = new kakao.maps.Map(container, options); // 지도 생성
    setMap(mapInstance); // 지도 객체 상태 설정

    // 지도 확대/축소 컨트롤 추가
    const zoomControl = new kakao.maps.ZoomControl();
    mapInstance.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
  }, []);

  // 마커와 인포윈도우 설정
  useEffect(() => {
    if (!map) return;

    // 기존 마커 제거
    markers.forEach((marker) => marker.setMap(null));
    setMarkers([]);

    // 새로운 마커 추가
    const newMarkers = results.map((store) => {
      const position = new kakao.maps.LatLng(store.latitude, store.longitude);
      const marker = new kakao.maps.Marker({
        map: map,
        position: position,
        title: store.storeName,
      });

      const infowindow = new kakao.maps.InfoWindow({
        content: `<div style="padding:5px;z-index:1;">${store.storeName}</div>`, // 인포윈도우 내용 설정
      });

      // 마커 클릭 이벤트 설정
      kakao.maps.event.addListener(marker, "click", () => {
        if (infoWindow) {
          infoWindow.close(); // 기존 인포윈도우 닫기
        }
        infowindow.open(map, marker); // 새로운 인포윈도우 열기
        setInfoWindow(infowindow); // 현재 인포윈도우 상태 업데이트
      });

      return marker;
    });

    setMarkers(newMarkers); // 마커 상태 업데이트
  }, [results, map, infoWindow]);

  // 현재 위치로 이동
  const handleCurrentLocation = () => {
    const { kakao } = window as any;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        const locPosition = new kakao.maps.LatLng(latitude, longitude);
        map.setCenter(locPosition);

        const marker = new kakao.maps.Marker({
          position: locPosition,
          map: map,
        });
        setMarkers((prevMarkers) => [...prevMarkers, marker]); // 새로운 마커 추가
      });
    } else {
      alert("현재 위치를 가져올 수 없습니다.");
    }
  };

  return (
    <div className="relative h-full w-full">
      <div ref={mapRef} className="h-full w-full"></div>
      <button
        className="absolute top-48 right-0 bg-white p-2 rounded-full flex items-center justify-center z-50"
        onClick={handleCurrentLocation} // 현재 위치로 이동하는 기능
      >
        <BiTargetLock className="text-black text-2xl" />
      </button>
    </div>
  );
};

export default MyMap;
