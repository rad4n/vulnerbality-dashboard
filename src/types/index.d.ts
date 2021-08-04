export declare interface VulnerabilityReportTarget {
  Target: string
  Type: string
  Vulnerabilities?: Vulnerability[]
}

export declare interface Vulnerability {
  id?: number
  Title: string
  Description: string
  PrimaryURL: string
  PkgName: string
  VulnerabilityID: string
  Severity: string
  InstalledVersion: string
  FixedVersion: string
  Target: string
}

export declare interface VulnerabilitySeverityInformation {
  severity: string
  count: number
}