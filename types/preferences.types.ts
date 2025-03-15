export interface Country {
  id: string;
  text: string;
}

export interface Targets {
  id: string;
  text: string;
}

export interface Period {
  id: string;
  text: string;
}

export interface Amounts {
  id: string;
  text: string;
}

export interface ISP {
  country: Country[];
  targets: Targets[];
  period: Period[];
}

export interface IPV4 {
  country: Country[];
  targets: Targets[];
  period: Period[];
}

export interface IPV6 {
  country: Country[];
  targets: Targets[];
  period: Period[];
}

export interface Preferences {
  status: string;
  isp: ISP;
  ipv6: IPV6;
  ipv4: IPV4;
  amounts: Amounts[];
}
