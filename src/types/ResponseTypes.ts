// login 
export interface LoginResponseModel {
  userDetails?: any;
  response: number;
  responsemassage: string;
  token?: string;
  account?: any;
}

interface UserDetails {
  uid: string;
  email: string;
  emailVerified: boolean;
  isAnonymous: boolean;
  providerData: ProviderData[];
  stsTokenManager: TokenManager;
  createdAt: string;
  lastLoginAt: string;
  apiKey: string;
  appName: string;
}

interface ProviderData {
  providerId: string;
  uid: string;
  displayName: string | null;
  email: string;
  phoneNumber: string | null;
  photoURL: string | null;
}

interface TokenManager {
  refreshToken: string;
  accessToken: string;
  expirationTime: number;
}

// My Requisition
export interface MyRequisitionViewModelList {
  items: MyRequisitionViewModel[];
  isSuccess: boolean;
  total: number;
  responseMessage: string;
  responseItemType: number;
}

interface MyRequisitionViewModel {
  id: number;
  jobTitle: string;
  jobPostingCode: string;
  jobStatus: number;
  jobStatusName: string;
  city: string;
  stateId: number;
  postedDate: Date;
  clientId: number;
  total: number;
  companyName: string;
  clientJobId: string;
  noOfOpenings: number;
  jobDepartmentLookupId: number;
  creatorId: number;
  allowRecruitersToChangeStatus: boolean;
  showInEmployeeReferralPortal: boolean;
  updateDate: Date;
  startDate: Date;
  teamCount: number;
  closed: number;
}


// Approval list
export interface MyRequisitionApprovalsViewModel {
  myRequisitionPendingItems: MyRequisitionPendingListViewModel[];
  myRequisitionSuccessItems: MyRequisitionSuccessListViewModel[];
  isSuccess: boolean;
  pendingApprovalsTotal: number;
  successHistoryTotal: number;
  responseMessage: string;
  responseItemType: number;
}

export interface MyRequisitionPendingListViewModel {
  id: number;
  keyId: number;
  assignedWorkflowApprovalId: number;
  locationName: string;
  startDate: Date;
  updateDate: Date;
  jobPostingCode: number;
  noOfOpenings: number;
  jobTitle: string;
  clientId: number;
  internalExternal: number;
  cloneId: number;
  clientName: string;
  raisedBy: string;
  jobStatus: string;
}

interface MyRequisitionSuccessListViewModel {
  id: number;
  keyId: number;
  assignedWorkflowApprovalId: number;
  locationName: string;
  startDate: Date;
  updateDate: Date;
  jobPostingCode: number;
  noOfOpenings: number;
  jobTitle: string;
  clientId: number;
  internalExternal: number;
  cloneId: number;
  comments: string;
  status: string;
  justification: string;
  rMGInternalExternal: string;
  clientName: string;
  raisedBy: string;
  jobStatus: string;
}

// Candidate Hiring Status
export interface MyRequisitionCandidateHiringStatusModel {
  myRequisitionCandidateHiringStatusItems: MyRequisitionCandidateHiringStatusModelrespons[];
  isSuccess: boolean;
  total: number;
  responseMessage: string;
  responseItemType: number;
}

interface MyRequisitionCandidateHiringStatusModelrespons {
  id: number;
  memberId: number;
  candidateName: string;
  jobTitle: string;
  currentPosition: string;
  matchingPercentage: number;
  currentLevel: number;
  hasUpCommingInterview: number;
  hasSubmissionDetail: number;
  hasOfferDetail: number;
  hasJoiningDetail: number;
  dateAdded: Date;
  hasOfferDeclineDetail: number;
  source: string;
  jobPostingCode: number;
  currentState: string;
  primaryManager: string;
}


// Submit To Hiring Manager
export interface SubmitToHiringManagerModel {
  items: SubmitToHiringManagerModelList[];
  isSuccess: boolean;
  total: number;
  responseMessage: string;
  responseItemType: number;
}

interface SubmitToHiringManagerModelList {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  nickName: string;
  permanentAddressLine1: string;
  permanentAddressLine2: string;
  permanentCity: string;
  permanentStateId: number;
  permanentCountryId: number;
  permanentPhone: string;
  primaryEmail: string;
}


// Submit Candidates by Email
export interface SubmitCandidatesbyEmailResponseModel {
  departmentdropdownrespons: Departmentdropdownrespons[];
  trackerSheetdropdownrespons: TrackerSheetdropdownrespons[];
  myrequisitionjobsdropdowns: MyRequisitionJobsDropDown[];
  isSuccess?: boolean;
  responseMessage?: string;
  departmentdropdownresponsTotal: number;
  trackerSheetdropdownresponsTotal: number;
}

export interface Departmentdropdownrespons {
  id: number;
  companyId: number;
  companyName: string;
}

export interface TrackerSheetdropdownrespons {
  id: number;
  comboName: string;
}

export interface MyRequisitionJobsDropDown {
  id: number;
  jobTitle: string;
}

// Dashboard
export interface DashboardModelResponse {
  name: string;
  totalCount: number;
}

export interface DashboardModel {
  dashboardItems: DashboardModelResponse[];
  isSuccess: boolean;
  responseMessage: string;
}

// Add Requisition Dropdown
export interface MyRequisitionDropdownList {
  myRequisitionDepartmentLists: MyRequisitionDepartmentList[]; //1
  myRequisitionDesignationsLists: MyRequisitionDesignationsList[]; //3 
  myRequisitionBandLists: MyRequisitionBandList[]; //4
  myRequisitionGradesLists: MyRequisitionGradesList[]; //5
  myRequisitionLocationsLists: MyRequisitionLocationsList[]; //6
  myRequisitionEducationQualifications: MyRequisitionEducationQualification[]; //7
  myRequisitionEmployeeTypes: MyRequisitionEmployeeType[]; //8
  myRequisitionCountrys: Country[]; //9
  myRequisitionStates: State[]; //10
  myRequisitionEntities: MyRequisitionEntitie[]; //12
  myRequisitionRequisitionTypes: MyRequisitionRequisitionType[]; //11
  myRequisitionLoadJobDescriptions: MyRequisitionLoadJobDescription[]; //13
  myRequisitionHiringManagers: MyRequisitionHiringManager[]; //2
  localResponseModel: LocalResponseModel;
}

export interface MyRequisitionDepartmentList {
  id: number;
  companyName: string;
}

export interface MyRequisitionDesignationsList {
  designationId: number;
  designationName: string;
}

export interface MyRequisitionBandList {
  id: number;
  name: string;
}

export interface MyRequisitionGradesList {
  gradeId: number;
  gradeName: string;
}

export interface MyRequisitionLocationsList {
  locationId: number;
  parentId: number;
  locationName: string;
}

export interface MyRequisitionEducationQualification {
  id: number;
  name: string;
}

export interface MyRequisitionEmployeeType {
  id: number;
  type: number;
  isActive: number;
  name: string;
}

export interface MyRequisitionEntitie {
  id: number;
  entityType: number;
  status: boolean;
  name: string;
}

export interface MyRequisitionRequisitionType {
  id: number;
  name: string;
}

export interface MyRequisitionLoadJobDescription {
  id: number;
  name: string | null;
  description: string | null;
  roleId: number | null;
  designationId: number | null;
  createdDate: Date | null;
  updatedDate: Date | null;
  createdId: number | null;
  updatedId: number | null;
}

export interface MyRequisitionHiringManager {
  id: number;
  companyId: number;
  name: string;
}

export interface LocalResponseModel {
  isSuccess: boolean;
  total: number;
  responseMessage: string;
  responseItemType: number;
}

export interface Country {
  id: number;
  name: string;
  keyId: number;
  countryCode: string;
  states: State[];
}

export interface State {
  id: number;
  name: string;
  keyId: number;
  stateCode: string;
  countryId: number;
  country: Country;
}

// Add requisition
export interface MyRequisitionSubmitResponse {
  isSuccess: boolean;
  total: number;
  responseMessage: string;
  responseItemType: number;
}

// user response 
export interface UsersResponseModel {
  userDetailsItems: UserDetails | undefined;
  isSuccess: boolean;
  responseMessage: string;
  responseItemType: number;
}

//submit candidate form 
export interface SubmitCandidatesbyEmailResponseModelForEmail {
  isSuccess: boolean;
  responseMessage: string;
}

export interface LogoutResponseModel {
  isSuccess: boolean;
  responseMessage: string;
  responseItemType: number;
}

export interface MyRequisitionApprovalsOrRejectModelResponse {
  isSuccess: boolean;
  responseMessage: string;
  responseItemType: number;
}

export interface SubmitCandidatesbyEmailJobPostResponseModel {
  myrequisitionjobsdropdowns: MYRequisitionJobsDropDown[];
  isSuccess: boolean;
  responseMessage: string;
}

interface MYRequisitionJobsDropDown {
  id: number;
  jobTitle: string;
}
