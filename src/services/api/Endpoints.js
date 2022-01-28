import { env } from '@config/Constants';
import request from './Base';

// NON AUTH TOKEN
const login = (payload) => request({
  url: 'mobile/api/v1/token',
  method: 'POST',
  data: { grant_type: 'password', ...env.authIdentifiers, ...payload }, // client_id, client_secret, username, password
});

const logout = () => request({
  url: 'mobile/api/v1/token/remove',
  method: 'GET',
});

const verifyAccount = (payload) => request({
  url: 'general/api/v1/otp/verify-account',
  method: 'POST',
  data: payload
});

const checkKTANumber = (payload) => request({
  url: 'mobile/api/v1/user/kta/validation',
  method: 'POST',
  data: payload, // kta_number
});

const checkKTADetail = (payload) => request({
  url: 'mobile/api/v1/user/kta/detail',
  method: 'POST',
  data: payload, // kta_number, code
});

const storeProfile = (payload) => request({
  url: 'mobile/api/v1/user',
  method: 'POST',
  data: payload, // *kta_number, *code, email, phone, fullname, birth_date
});

const requestUpgradeAccount = (payload) => request({
  url: 'mobile/api/v1/user/request/upgrade',
  method: 'POST',
  data: payload, // kta_number, nik, name, birth_date, gender, ktp_image, ktp_selfie_image
});

const updateLocation = (payload) => request({
  url: 'mobile/api/v1/user/update/location',
  method: 'POST',
  data: payload, // latitude, longitude
});


const getProvinces = () => request({
  url: 'mobile/api/v1/area/province',
  method: 'GET',
});

const getCities = (params) => request({
  url: 'mobile/api/v1/area/city',
  method: 'GET',
  params: params, // province_id
});

const getDistricts = (params) => request({
  url: 'mobile/api/v1/area/district',
  method: 'GET',
  params: params, // city_id
});

const getSubDistricts = (params) => request({
  url: 'mobile/api/v1/area/sub-district',
  method: 'GET',
  params: params, // district_id
});

// WITH AUTH TOKEN
const getUser = () => request({
  url: 'mobile/api/v1/user',
  method: 'GET'
});

const notificationsIndex = (params) => request({
  url: 'general/api/v1/user-notif',
  method: 'GET',
  params: params
});

const notificationsStoreToken = (body) => request({
  url: 'general/api/v1/user-notif',
  method: 'POST',
  data: body, // token, type
});

const notificationsUpdateRead = (context) => request({
  url: 'general/api/v1/user-notif/' + context.id,
  method: 'PUT',
});

const getListProvinces = () => request({
  url: 'general/api/v1/area/province',
  method: 'GET',
});

const getListCities = (params) => request({
  url: 'general/api/v1/area/city',
  method: 'GET',
  params: params, // province_id
});

const getListDistricts = (params) => request({
  url: 'general/api/v1/area/district',
  method: 'GET',
  params: params, // city_id
});

const getListSubDistricts = (params) => request({
  url: 'general/api/v1/area/sub-district',
  method: 'GET',
  params: params, // district_id
});

const getListSector = () => request({
  url: 'general/api/v1/list/sector',
  method: 'GET',
});

const getListAreaType = () => request({
  url: 'general/api/v1/list/area-type',
  method: 'GET',
});

const getListProfession = () => request({
  url: 'general/api/v1/list/profession',
  method: 'GET',
})

const getListEducation = () => request({
  url: 'general/api/v1/list/education',
  method: 'GET',
});

const getListEtnis = () => request({
  url: 'general/api/v1/list/etnis',
  method: 'GET',
});

const getListPartai = () => request({
  url: 'general/api/v1/political/party',
  method: 'GET',
});

const getListKandidat = () => request({
  url: 'general/api/v1/political/candidate',
  method: 'GET',
});

const getListIssueCategory = () => request({
  url: 'general/api/v1/list/issue-category',
  method: 'GET',
});

const getListIssueCategoryDetail = (context) => request({
  url: 'general/api/v1/list/issue-category-detail/' + context.id,
  method: 'GET',
})


const potentialCommunityIndex = (params) => request({
  url: 'mobile/api/v1/potential/community',
  method: 'GET',
  params: params, // page, per_page, search,
});

const potentialCommunityShow = (context) => request({
  url: 'mobile/api/v1/potential/community/' + context.id,
  method: 'GET',
});

const potentialCommunityStore = (body) => request({
  url: 'mobile/api/v1/potential/community',
  method: 'POST',
  data: body,
});

const potentialCommunityUpdate = (context, body) => request({
  url: 'mobile/api/v1/potential/community/' + context.id,
  method: 'POST',
  data: body
});

const potentialCommunityDelete = (context) => request({
  url: 'mobile/api/v1/potential/community/' + context.id,
  method: 'DELETE',
});

const potentialVoterIndex = (params) => request({
  url: 'mobile/api/v1/potential/voter',
  method: 'GET',
  params: params, // page, per_page, search,
});

const potentialVoterShow = (context) => request({
  url: 'mobile/api/v1/potential/voter/' + context.id,
  method: 'GET',
});

const potentialVoterStore = (body) => request({
  url: 'mobile/api/v1/potential/voter',
  method: 'POST',
  data: body,
});

const potentialVoterUpdate = (context, body) => request({
  url: 'mobile/api/v1/potential/voter/' + context.id,
  method: 'POST',
  data: body
});

const potentialVoterDelete = (context) => request({
  url: 'mobile/api/v1/potential/voter/' + context.id,
  method: 'DELETE',
});

const influentialCitizenIndex = (params) => request({
  url: 'mobile/api/v1/influential/citizen',
  method: 'GET',
  params: params, // page, per_page, search,
});

const influentialCitizenShow = (context) => request({
  url: 'mobile/api/v1/influential/citizen/' + context.id,
  method: 'GET',
});

const influentialCitizenStore = (body) => request({
  url: 'mobile/api/v1/influential/citizen',
  method: 'POST',
  data: body,
});

const influentialCitizenUpdate = (context, body) => request({
  url: 'mobile/api/v1/influential/citizen/' + context.id,
  method: 'POST',
  data: body
});

const influentialCitizenDelete = (context) => request({
  url: 'mobile/api/v1/influential/citizen/' + context.id,
  method: 'DELETE',
});

const situationReportIndex = (params) => request({
  url: 'mobile/api/v1/activity/situation-report',
  method: 'GET',
  params: params, // page, per_page, search,
});

const situationReportShow = (context) => request({
  url: 'mobile/api/v1/activity/situation-report/' + context.id,
  method: 'GET',
});

const situationReportStore = (body) => request({
  url: 'mobile/api/v1/activity/situation-report',
  method: 'POST',
  data: body,
  // headers: {
  //   'Content-Type': 'multipart/form-data',
  // }
});

const situationReportUpdate = (context, body) => request({
  url: 'mobile/api/v1/activity/situation-report/' + context.id,
  method: 'POST',
  data: body,
  // headers: {
  //   'Content-Type': 'multipart/form-data',
  // }
});

const situationReportDelete = (context) => request({
  url: 'mobile/api/v1/activity/situation-report/' + context.id,
  method: 'DELETE',
});

const situationReportCategory = () => request({
  url: 'general/api/v1/list/situation-report-category',
  method: 'GET',
})

const myTaskIndex = (params) => request({
  url: 'mobile/api/v1/my-task',
  method: 'GET',
  params: params, // page, per_page, search,
});

const myTaskShow = (context) => request({
  url: 'mobile/api/v1/my-task/' + context.id,
  method: 'GET',
});

const myTaskUpdate = (context, body) => request({
  url: 'mobile/api/v1/my-task/' + context.id,
  method: 'PUT',
  data: body, // status, reason
});

const myTaskHistories = (params) => request({
  url: 'mobile/api/v1/my-task/list/history',
  method: 'GET',
  params: params,
});

const managementIssueIndex = (params) => request({
  url: 'mobile/api/v1/management/issue',
  method: 'GET',
  params: params, // page, per_page, search,
});

const managementIssueShow = (context) => request({
  url: 'mobile/api/v1/management/issue/' + context.id,
  method: 'GET',
});

const managementIssueStore = (body) => request({
  url: 'mobile/api/v1/management/issue',
  method: 'POST',
  data: body,
});

const managementIssueUpdate = (context, body) => request({
  url: 'mobile/api/v1/management/issue/' + context.id,
  method: 'POST',
  data: body
});

const managementIssueDelete = (context) => request({
  url: 'mobile/api/v1/management/issue/' + context.id,
  method: 'DELETE',
});

const monitoringCompetitorIndex = (params) => request({
  url: 'mobile/api/v1/activity/monitoring-competitor',
  method: 'GET',
  params: params, // page, per_page, search, sort, sort_type, area_id
});

const monitoringCompetitorShow = (context) => request({
  url: 'mobile/api/v1/activity/monitoring-competitor/' + context.id,
  method: 'GET',
});

const monitoringCompetitorStore = (body) => request({
  url: 'mobile/api/v1/activity/monitoring-competitor',
  method: 'POST',
  data: body,
});

const monitoringCompetitorUpdate = (context, body) => request({
  url: 'mobile/api/v1/activity/monitoring-competitor/' + context.id,
  method: 'POST',
  data: body
});

const monitoringCompetitorDelete = (context) => request({
  url: 'mobile/api/v1/activity/monitoring-competitor/' + context.id,
  method: 'DELETE',
});

const monitoringCompetitorListCategory = (params) => request({
  url: 'mobile/api/v1/activity/monitoring-competitor/list/category',
  method: 'GET',
});

const campaignMessageIndex = (params) => request({
  url: 'mobile/api/v1/activity/campaign/message',
  method: 'GET',
  params: params, // page, per_page, search,
});

const campaignMessageShow = (context) => request({
  url: 'mobile/api/v1/activity/campaign/message/' + context.id,
  method: 'GET',
});

const campaignMessageLike = (context) => request({
  url: 'mobile/api/v1/activity/campaign/message/' + context.id + '/like',
  method: 'POST',
});

const campaignMessageUnlike = (context) => request({
  url: 'mobile/api/v1/activity/campaign/message/' + context.id + '/unlike',
  method: 'POST',
});

const campaignMessageShare = (context) => request({
  url: 'mobile/api/v1/activity/campaign/message/' + context.id + '/share',
  method: 'POST',
});

const campaignMessageListComment = (context, params) => request({
  url: 'mobile/api/v1/activity/campaign/message/' + context.id + '/comment',
  method: 'GET',
  params: params, // page, per_page, search,
});

const campaignMessageComment = (context, body) => request({
  url: 'mobile/api/v1/activity/campaign/message/' + context.id + '/comment',
  method: 'POST',
  data: body // comment
});

const eventActivityIndex = (params) => request({
  url: 'mobile/api/v1/activity/event',
  method: 'GET',
  params: params, // page, per_page, search,
});

const eventActivityShow = (context) => request({
  url: 'mobile/api/v1/activity/event/' + context.id,
  method: 'GET',
});

const eventActivityLike = (context) => request({
  url: 'mobile/api/v1/activity/event/' + context.id + '/like',
  method: 'POST',
});

const eventActivityUnlike = (context) => request({
  url: 'mobile/api/v1/activity/event/' + context.id + '/unlike',
  method: 'POST',
});

const eventActivityShare = (context) => request({
  url: 'mobile/api/v1/activity/event/' + context.id + '/share',
  method: 'POST',
});

const eventActivityListComment = (context, params) => request({
  url: 'mobile/api/v1/activity/event/' + context.id + '/comment',
  method: 'GET',
  params: params, // page, per_page, search,
});

const eventActivityComment = (context, body) => request({
  url: 'mobile/api/v1/activity/event/' + context.id + '/comment',
  method: 'POST',
  data: body // comment
});

const logisticReceiptIndex = (params) => request({
  url: 'mobile/api/v1/delivery/logistic/receipt',
  method: 'GET',
  params: params, // page, per_page, search,
});

const logisticReceiptShow = (context) => request({
  url: 'mobile/api/v1/delivery/logistic/receipt/' + context.id,
  method: 'GET',
});

const logisticReceiptUpdate = (context, body) => request({
  url: 'mobile/api/v1/delivery/logistic/receipt/' + context.id,
  method: 'POST',
  data: body
});

const forumListRoom = (params) => request({
  url: 'mobile/api/v1/chat/list-room',
  method: 'GET',
  params: params, // page, per_page, search,
});

const forumDetailRoom = (params, context) => request({
  url: 'mobile/api/v1/chat/room/' + context.id,
  method: 'GET',
  params: params, // page, per_page, search,
});

const forumMessageSend = (body, context) => request({
  url: 'mobile/api/v1/chat/message/' + context.id,
  method: 'POST',
  data: body, // page, per_page, search,
});

const forumReadByLastMessageId = (params, context) => request({
  url: 'mobile/api/v1/chat/message/' + context.id + '/read',
  method: 'GET',
  params: params, // page, per_page, search,
});

const forumPostList = (params) => request({
  url: 'mobile/api/v1/forum',
  method: 'GET',
  params: params, // page, per_page, search,
});

const forumPostShow = (params, context) => request({
  url: 'mobile/api/v1/forum/' + context.id,
  method: 'GET',
  params: params, // page, per_page, search,
});

const forumPostListCommentById = (params, context) => request({
  url: 'mobile/api/v1/forum/' + context.id + '/comment',
  method: 'GET',
  params: params, // page, per_page, search,
});

const forumPostGetPostingByUserId = (params, context) => request({
  url: 'mobile/api/v1/forum/posting/' + context.id,
  method: 'GET',
  params: params, // page, per_page, search,
});

const forumPostGetProfileByUserId = (params, context) => request({
  url: 'mobile/api/v1/forum/profile/' + context.id,
  method: 'GET',
  params: params, // page, per_page, search,
});

const forumPostStore = (body, formData) => request({
  url: 'mobile/api/v1/forum',
  method: 'POST',
  data: body || formData, // media_text, media_type, media,
  headers: !body && formData ? {
    'Content-Type': 'multipart/form-data',
  } : null
});

const forumPostDeletePosting = (context) => request({
  url: 'mobile/api/v1/forum/' + context.id,
  method: 'DELETE',
});

const forumPostUpdateProfile = (body) => request({
  url: 'mobile/api/v1/forum/update/profile',
  method: 'POST',
  data: body, // description, image_type, image,
});

const forumPostLike = (context) => request({
  url: 'mobile/api/v1/forum/' + context.id + '/like',
  method: 'POST',
});

const forumPostUnlike = (context) => request({
  url: 'mobile/api/v1/forum/' + context.id + '/unlike',
  method: 'POST',
});

const forumPostSendComment = (body, context) => request({
  url: 'mobile/api/v1/forum/' + context.id + '/comment',
  method: 'POST',
  data: body, // media_text, media_type, media,
});

const newsGetAllCategories = () => request({
  url: 'general/api/v1/newsfeed/category',
  method: 'GET',
});

const newsGetList = (params) => request({
  url: 'general/api/v1/newsfeed',
  method: 'GET',
  params: params, // category_id
});


//DASHBOARD
const dashboard = (params) => request({
  url: 'mobile/api/v1/dashboard',
  method: 'GET',
  params: params, // page, per_page, search,
});

const eventDashboardIndex = (params) => request({
  url: 'mobile/api/v1/dashboard/event',
  method: 'GET',
  params: params, // page, per_page, search,
});

const campaignMessageDashboardIndex = (params) => request({
  url: 'web/api/v1/dashboard/campaign/message',
  method: 'GET',
  params: params, // page, per_page, search,
});

const getNewsFeed = () => request({
  url: 'mobile/api/v1/newsfeed',
  method: 'GET',
});


//MY ACCOUNT
const userActivitiesIndex = (params) => request({
  url: 'general/api/v1/user/activity',
  method: 'GET',
  params: params, // page, per_page, search,
});

const getTermsAndConditions = () => request({
  url: 'general/api/v1/content?type=terms-conditions',
  method: 'GET',
});

const getPrivacyPolicy = () => request({
  url: 'general/api/v1/content?type=privacy-policy',
  method: 'GET',
});



const Endpoints = {
  // NON AUTH TOKEN
  login,
  logout,
  verifyAccount,
  checkKTANumber,
  checkKTADetail,
  storeProfile,
  requestUpgradeAccount,
  updateLocation,

  getProvinces,
  getCities,
  getDistricts,
  getSubDistricts,

  // WITH AUTH TOKEN
  getUser,
  notificationsIndex,
  notificationsStoreToken,
  notificationsUpdateRead,

  getListProvinces,
  getListCities,
  getListDistricts,
  getListSubDistricts,

  /**
   * GENERAL
   */
  getListSector,
  getListAreaType,
  getListProfession,
  getListEducation,
  getListEtnis,
  getListPartai,
  getListKandidat,
  getListIssueCategory,
  getListIssueCategoryDetail,

  potentialCommunityIndex,
  potentialCommunityShow,
  potentialCommunityStore,
  potentialCommunityUpdate,
  potentialCommunityDelete,

  potentialVoterIndex,
  potentialVoterShow,
  potentialVoterStore,
  potentialVoterUpdate,
  potentialVoterDelete,

  influentialCitizenIndex,
  influentialCitizenShow,
  influentialCitizenStore,
  influentialCitizenUpdate,
  influentialCitizenDelete,

  situationReportIndex,
  situationReportShow,
  situationReportStore,
  situationReportUpdate,
  situationReportDelete,
  situationReportCategory,

  myTaskIndex,
  myTaskShow,
  myTaskUpdate,
  myTaskHistories,

  managementIssueIndex,
  managementIssueShow,
  managementIssueStore,
  managementIssueUpdate,
  managementIssueDelete,

  monitoringCompetitorIndex,
  monitoringCompetitorShow,
  monitoringCompetitorStore,
  monitoringCompetitorUpdate,
  monitoringCompetitorDelete,
  monitoringCompetitorListCategory,

  campaignMessageIndex,
  campaignMessageShow,
  campaignMessageLike,
  campaignMessageUnlike,
  campaignMessageShare,
  campaignMessageListComment,
  campaignMessageComment,

  eventActivityIndex,
  eventActivityShow,
  eventActivityLike,
  eventActivityUnlike,
  eventActivityShare,
  eventActivityListComment,
  eventActivityComment,

  logisticReceiptIndex,
  logisticReceiptShow,
  logisticReceiptUpdate,

  forumListRoom,
  forumDetailRoom,
  forumMessageSend,
  forumReadByLastMessageId,

  forumPostList,
  forumPostShow,
  forumPostListCommentById,
  forumPostGetPostingByUserId,
  forumPostGetProfileByUserId,
  forumPostStore,
  forumPostDeletePosting,
  forumPostUpdateProfile,
  forumPostLike,
  forumPostUnlike,
  forumPostSendComment,

  newsGetAllCategories,
  newsGetList,

  /**
   * DASHBOARD
   */
  dashboard,
  eventDashboardIndex,
  campaignMessageDashboardIndex,
  getNewsFeed,

  /**
   * MY ACCOUNT
   */
  userActivitiesIndex,
  getTermsAndConditions,
  getPrivacyPolicy,


};

export default Endpoints;
