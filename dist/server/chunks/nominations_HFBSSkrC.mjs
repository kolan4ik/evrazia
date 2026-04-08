import { P as PATHS } from './paths_CaINX1_I.mjs';

function getNominationRouteValue(nomination) {
  if (nomination.id === void 0 || nomination.id === null) {
    return "";
  }
  return String(nomination.id).trim();
}
function getDictionaryRouteValue(item) {
  if (item.id !== void 0 && item.id !== null) {
    return String(item.id).trim();
  }
  if (item.code) {
    return item.code.trim();
  }
  return "";
}
function getNominationHref(nomination) {
  const id = getNominationRouteValue(nomination);
  if (!id) {
    return PATHS.root;
  }
  return `${PATHS.participantForm}?id=${encodeURIComponent(id)}`;
}
function getParticipantFormNominationId(searchParams) {
  const value = searchParams.get("id");
  if (typeof value !== "string") {
    return null;
  }
  const normalizedValue = value.trim();
  return normalizedValue ? normalizedValue : null;
}
function findNominationByRouteValue(nominations, routeValue) {
  return nominations.find((nomination) => getNominationRouteValue(nomination) === routeValue) ?? null;
}

export { getParticipantFormNominationId as a, getDictionaryRouteValue as b, findNominationByRouteValue as f, getNominationHref as g };
