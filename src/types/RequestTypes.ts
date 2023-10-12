export interface LoginRequestModel {
  Email: string;
  password: string;
  browserType: string;
  BrowserVersions: string;
}

export interface LocalViewModel {
  StartPage: number
  PageSize: number
  SortColumn: string
  SortOrder: string
  WhereClause: string
  JobStatus: string
  GetAll: boolean
  memberId: number | undefined
}

export interface MyRequisitionRoleRequest {
  memberId: number | undefined;
  isSingle: number;
}

export interface MyRequisitionCandidateHiringStatusModelRequest {
  StartPage: number;
  PageSize: number; // Default: 10
  SortColumn: string; // Default: "MatchingPercentage"
  SortOrder: string; // Default: "asc"
  WhereClause: string | null; // Default: null
  JobPostingId: number | null | undefined; // Default: User ID
}

export interface SubmitToHiringManagerModelRequest {
  jobPostingId: number | undefined;
}

export interface SubmitCandidatesbyEmailModelRequest {
  JobPostingId: number | undefined;
}

export interface MyRequisitionSubmitRequest {
  Id: string;
  DepartMentId: string;
  DepartMentContactId: string;
  DesignationsId: string;
  BandId: string;
  GradeId: string;
  LocationId: string;
  JobTitleName: string;
  EducationQualificationId: string;
  EducationQualification: string | null;
  MinExperienceRequired: string;
  MaxExperienceRequired: string;
  EmployeeTypeId: string;
  CountryId: string;
  StateId: string;
  RequisitionTypesId: string;
  NoOfOpoenings: string;
  MinSalaryRange: string;
  MaxSalaryRange: string;
  DateOfRequisition: Date;
  OpenDate: Date;
  ExpectedFulfillmentDate: Date;
  EntityId: string;
  LoadJobDescriptions: string;
  JobDescriptions: string | null;
  CurrentJobPostingId: string;
  NoOfClones: string;
  CurrentMemberId: string;
  ClientJobId: string;
  ClientId: string;
  ContactEmail: string;
  ParentDepartmentId: string;
  ParentLocationId: string;
  Saveclick: string;
  UpdatorId: string;
  CreatorId: string;
}


// user 
export interface UsersRequestModel {
  email: string;
}

export interface SubmitCandidatesbyEmailModel {
  CurrentSelectionStepLookupId: string;
  MovingDirection: string;
  IsLandT: boolean;
  JobPostingId: string;
  MemberId: string;
  StatusId: string;
  CreatorId: string;
  IsRemoved: boolean;
  ReceiverEmail: string;
  MemberEmailDetailId: string;
  DateSubmitted: Date;
  CompanyId: string;
  UpdatorId: string;
  SenderId: string;
  SenderEmail: string;
  DropdownEmailId: string;
  CarboncopyId: string;
  CarboncopyName: string;
  OtherCarbonCopyId: string;
  OtherCarbonCopyName: string;
  SendtoOther: string;
  EmailTypeLookupId: string;
  EmailBody: string;
  AttachedFileNames: string;
  AttachedFile : string;
  NoOfAttachments: string;
  StrNextLevel: string;
  MovetonextLevel: boolean;
  Subject: string;
  SubmitCandidatesbyEmailcheck: SubmitCandidatesbyEmailcheck;
  CandidateId: string;
  TrackerSheet: string;
  JobCandidateById: string;
}

enum SubmitCandidatesbyEmailcheck {
  HiringManager = 0,
  Other = 1
}

export interface LogoutRequestModel {
  Email: string | undefined;
}

export interface MyRequisitionApprovalsOrRejectModel {
  CommandName: string | null;
  Id: number | undefined;
  Comments: string | undefined;
  NoOfApproval: number;
  CloneId: number | null;
  DropDownList: number | null;
  CurrentMemberEmail: string | undefined;
  CurrentMemberId: number | undefined;
  ApprovalsOrReject: ApprovalsOrReject;
}

enum ApprovalsOrReject {
  Approve = 1,
  Reject = 2,
}
