// src/molecules/Kit/KitInfo.tsx

import React from "react";
import Text from "../../atom/Kit/KitText";

type KitInfoProps = {
  name: string;
  description: string;
  price: number;
  quantity: number;
};

const KitInfo = ({ name, description, price, quantity }: KitInfoProps) => (
  <div className="p-4">
    <Text content={name} className="text-xl font-semibold mb-2" />
    <Text content={description} className="text-gray-600 mb-2" />
    <Text
      content={`가격: ${price.toLocaleString()}원`}
      className="text-gray-600 mb-2"
    />
    <Text content={`수량: ${quantity}`} className="text-gray-600" />
  </div>
);

export default KitInfo;
