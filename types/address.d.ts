export type AddressItem = {
  id: number;
  name: string;
  province: string;
  city: string;
  county: string;
  addressDetail: string;
  tel: string;
  tag: string;
  isDefault: number;
};

export type updateAddressItem = {
  addressId?: number;
  province?: string;
  city?: string;
  county?: string;
  addressDetail?: string;
  areaCode?: string;
  postalCode?: string;
  tel?: string;
  name?: string;
  isDefault?: number;
  tag?: string;
};

export type AddressSelectedType = {
  id: number;
  name: string;
  address: string;
  tel: string;
  isDefault: number;
};
