import React, { useCallback, useEffect, useMemo, useState } from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { Container as ContainerBase } from "components/misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import illustration from "images/login-illustration.svg";
import logoColor from "images/logo-color.png";
import { ReactComponent as LoginIcon } from "feather-icons/dist/icons/log-in.svg";
import { ReactComponent as SaveIcon } from "feather-icons/dist/icons/save.svg";
import { ReactComponent as PlusIcon } from "feather-icons/dist/icons/plus-circle.svg";
import { ReactComponent as TrashIcon } from "feather-icons/dist/icons/trash-2.svg";
import {
  ECK_TIMEZONE,
  currentStatus,
  formatBannerDate,
  formatIntervalLine,
  monctonDateString,
  pickBannerDay,
} from "utils/walkinSchedule.js";

const Container = tw(ContainerBase)`min-h-screen bg-primary-900 text-white font-medium flex justify-center -m-8`;
const Content = tw.div`max-w-screen-xl m-0 sm:mx-20 sm:my-16 bg-white text-gray-900 shadow sm:rounded-lg flex justify-center flex-1`;
const MainContainer = tw.div`w-full lg:w-1/2 xl:w-7/12 p-6 sm:p-12 flex flex-col`;
const MainContent = tw.div`mt-8 flex flex-col items-center w-full flex-1`;

const Heading = tw.h1`text-2xl xl:text-3xl font-extrabold text-center`;
const Form = tw.form`w-full mt-6 max-w-md mx-auto`;
const Input = tw.input`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0`;
const SubmitButton = styled.button`
  ${tw`mt-6 tracking-wide font-semibold bg-primary-500 text-gray-100 w-full py-4 rounded-lg hover:bg-primary-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none disabled:opacity-50`}
  .icon {
    ${tw`w-6 h-6 -ml-2`}
  }
  .text {
    ${tw`ml-3`}
  }
`;

const ToolbarSubmit = styled(SubmitButton)`
  ${tw`mt-0 w-auto px-8`}
`;

const PanelRoot = tw.div`w-full mt-4 flex flex-col gap-8`;
const Toolbar = tw.div`flex flex-wrap items-center justify-between gap-3`;
const Muted = tw.p`text-sm text-gray-600`;
const PanelCard = tw.div`border border-gray-200 rounded-xl p-4 sm:p-5 bg-gray-100`;
const DayCard = tw.div`border border-gray-200 rounded-lg p-4 bg-white mb-4`;
const Row = tw.div`grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3`;
const Label = tw.label`block text-xs font-bold text-gray-500 uppercase tracking-wide`;
const TextArea = tw.textarea`mt-1 w-full px-4 py-3 rounded-lg font-medium bg-white border border-gray-200 text-sm focus:outline-none focus:border-primary-400 min-h-[4rem]`;
const SecondaryBtn = tw.button`inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-800`;
const DangerBtn = tw.button`inline-flex items-center gap-1 text-xs font-semibold text-red-600 hover:text-red-800`;
const IntervalRow = tw.div`flex flex-wrap items-end gap-2 mt-2`;
const PreviewShell = tw.div`bg-primary-900 text-gray-100 rounded-xl p-5 sm:p-6 shadow-inner`;
const PreviewHeading = tw.h4`text-xl sm:text-2xl font-black text-center leading-snug`;
const PreviewDescription = tw.p`mt-2 text-xs sm:text-sm text-gray-300 text-center`;
const PreviewStatsRow = tw.div`mt-4 grid grid-cols-3 gap-2 text-center`;
const PreviewStatValue = tw.div`text-lg sm:text-xl font-black leading-tight`;
const PreviewStatKey = tw.div`text-[11px] sm:text-xs font-medium text-gray-200 mt-1`;
const PreviewTitle = tw.h3`text-xs font-bold uppercase tracking-widest text-primary-600`;
const IllustrationContainer = tw.div`sm:rounded-r-lg flex-1 bg-purple-100 text-center hidden lg:flex justify-center items-stretch`;
const IllustrationImage = styled.div`
  ${(props) => css`
    background-image: url("${props.imageSrc}");
  `}
  ${tw`m-12 xl:m-16 w-full max-w-sm bg-contain bg-center bg-no-repeat`}
`;

function emptyDay() {
  return { date: monctonDateString(), intervals: [{ start: "11:00", end: "19:00" }], note: "" };
}

export default function AdminEckPage() {
  const [phase, setPhase] = useState("checking");
  const [loginUser, setLoginUser] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  const [kvWarn, setKvWarn] = useState(false);
  const [days, setDays] = useState([]);
  const [saveMsg, setSaveMsg] = useState({ type: "", text: "" });
  const [saving, setSaving] = useState(false);

  const refreshSession = useCallback(async () => {
    const res = await fetch("/api/admin-session", { credentials: "include" });
    const j = await res.json().catch(() => ({}));
    return !!(res.ok && j.ok);
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const ok = await refreshSession();
      if (cancelled) return;
      if (ok) {
        setPhase("panel");
        try {
          const r = await fetch("/api/admin-walkin", { credentials: "include" });
          const j = await r.json().catch(() => ({}));
          if (r.ok && j.ok && j.data) {
            setDays(Array.isArray(j.data.days) ? j.data.days : []);
            setKvWarn(j.kvConfigured === false);
          }
        } catch {
          setSaveMsg({ type: "err", text: "Failed to load data." });
        }
      } else {
        setPhase("login");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [refreshSession]);

  const previewPick = useMemo(() => pickBannerDay(days, monctonDateString()), [days]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    setLoginLoading(true);
    try {
      const res = await fetch("/api/admin-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username: loginUser, password: loginPass }),
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok || !j.success) {
        setLoginError(j.message || "Unable to sign in.");
        setLoginLoading(false);
        return;
      }
      setLoginPass("");
      setPhase("panel");
      const r = await fetch("/api/admin-walkin", { credentials: "include" });
      const data = await r.json().catch(() => ({}));
      if (r.ok && data.ok && data.data) {
        setDays(Array.isArray(data.data.days) ? data.data.days : []);
        setKvWarn(data.kvConfigured === false);
      }
    } catch {
      setLoginError("Network error.");
    }
    setLoginLoading(false);
  };

  const handleLogout = async () => {
    await fetch("/api/admin-logout", { method: "POST", credentials: "include" });
    setPhase("login");
    setDays([]);
  };

  const updateDay = (index, patch) => {
    setDays((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], ...patch };
      return next;
    });
  };

  const updateInterval = (dIdx, iIdx, patch) => {
    setDays((prev) => {
      const next = [...prev];
      const ivs = [...(next[dIdx].intervals || [])];
      ivs[iIdx] = { ...ivs[iIdx], ...patch };
      next[dIdx] = { ...next[dIdx], intervals: ivs };
      return next;
    });
  };

  const addInterval = (dIdx) => {
    setDays((prev) => {
      const next = [...prev];
      const ivs = [...(next[dIdx].intervals || [])];
      if (ivs.length >= 4) return prev;
      ivs.push({ start: "12:00", end: "17:00" });
      next[dIdx] = { ...next[dIdx], intervals: ivs };
      return next;
    });
  };

  const removeInterval = (dIdx, iIdx) => {
    setDays((prev) => {
      const next = [...prev];
      const ivs = [...(next[dIdx].intervals || [])].filter((_, i) => i !== iIdx);
      next[dIdx] = { ...next[dIdx], intervals: ivs.length ? ivs : [{ start: "11:00", end: "19:00" }] };
      return next;
    });
  };

  const addDay = () => {
    setDays((prev) => [...prev, emptyDay()]);
  };

  const removeDay = (dIdx) => {
    setDays((prev) => prev.filter((_, i) => i !== dIdx));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSaveMsg({ type: "", text: "" });
    try {
      const res = await fetch("/api/admin-walkin", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ timezone: ECK_TIMEZONE, days }),
      });
      const j = await res.json().catch(() => ({}));
      if (res.status === 401) {
        setPhase("login");
        setSaveMsg({ type: "err", text: "Session expired. Please sign in again." });
        setSaving(false);
        return;
      }
      if (!res.ok || !j.ok) {
        setSaveMsg({ type: "err", text: j.message || "Could not save." });
        setSaving(false);
        return;
      }
      if (j.data) {
        setDays(Array.isArray(j.data.days) ? j.data.days : []);
      }
      setKvWarn(false);
      setSaveMsg({ type: "ok", text: "Changes saved. They will appear on the site right away." });
    } catch {
      setSaveMsg({ type: "err", text: "Network error while saving." });
    }
    setSaving(false);
  };

  if (phase === "checking") {
    return (
      <AnimationRevealPage disabled>
        <Container>
          <Content tw="items-center justify-center min-h-[50vh]">
            <Muted tw="text-white">Loading…</Muted>
          </Content>
        </Container>
      </AnimationRevealPage>
    );
  }

  const previewIntervals = previewPick ? previewPick.day.intervals || [] : [];
  const previewIsToday = previewPick?.mode === "today";
  const previewStatus = previewIsToday
    ? currentStatus(previewIntervals) === "open"
      ? "OPEN"
      : "CLOSED"
    : "CLOSED";
  const previewHoursText =
    previewIntervals.length === 0
      ? "—"
      : previewIntervals.map((iv) => formatIntervalLine(iv.start, iv.end, "en")).join(" · ");

  return (
    <AnimationRevealPage disabled>
      <Container>
        <Content>
          <MainContainer>
            <img src={logoColor} alt="ECK" tw="h-8 mx-auto object-contain" />
            {phase === "login" && (
              <MainContent>
                <Heading>ECK Admin</Heading>
                <Muted tw="mt-2 text-center max-w-md">Public walk-in schedule (Dieppe, NB). Authorized personnel only.</Muted>
                <Form onSubmit={handleLogin}>
                  <Input
                    type="text"
                    autoComplete="username"
                    placeholder="Username"
                    value={loginUser}
                    onChange={(e) => setLoginUser(e.target.value)}
                  />
                  <Input
                    type="password"
                    autoComplete="current-password"
                    placeholder="Password"
                    value={loginPass}
                    onChange={(e) => setLoginPass(e.target.value)}
                  />
                  {loginError && <p tw="mt-3 text-sm text-red-600 text-center">{loginError}</p>}
                  <SubmitButton type="submit" disabled={loginLoading}>
                    <LoginIcon className="icon" />
                    <span className="text">{loginLoading ? "Signing in…" : "Sign In"}</span>
                  </SubmitButton>
                </Form>
              </MainContent>
            )}

            {phase === "panel" && (
              <MainContent tw="items-stretch">
                <div tw="text-center">
                  <Heading tw="text-left sm:text-center">Walk-In Schedule</Heading>
                  <Muted tw="mt-2">
                    Timezone: {ECK_TIMEZONE}. Visitors see the announcement based on the date in that timezone.
                  </Muted>
                  {kvWarn && (
                    <p tw="mt-3 text-sm text-gray-800 bg-gray-100 border border-gray-300 rounded-lg px-3 py-2">
                      KV is not configured in this environment: saving will fail until you add{" "}
                      <code>KV_REST_API_URL</code> and <code>KV_REST_API_TOKEN</code> in Vercel (or run{" "}
                      <code>vercel dev</code> with the project linked).
                    </p>
                  )}
                </div>

                <PanelRoot as="form" onSubmit={handleSave}>
                  <Toolbar>
                    <SecondaryBtn type="button" onClick={addDay}>
                      <PlusIcon tw="w-5 h-5" />
                      Add Day
                    </SecondaryBtn>
                    <div tw="flex flex-wrap gap-2">
                      <SecondaryBtn type="button" onClick={handleLogout}>
                        Sign Out
                      </SecondaryBtn>
                      <ToolbarSubmit type="submit" disabled={saving}>
                        <SaveIcon className="icon" />
                        <span className="text">{saving ? "Saving…" : "Save"}</span>
                      </ToolbarSubmit>
                    </div>
                  </Toolbar>

                  {saveMsg.text &&
                    (saveMsg.type === "ok" ? (
                      <p tw="text-green-800 bg-green-100 border border-green-200 rounded-lg px-3 py-2 text-sm">{saveMsg.text}</p>
                    ) : (
                      <p tw="text-red-800 bg-red-100 border border-red-200 rounded-lg px-3 py-2 text-sm">{saveMsg.text}</p>
                    ))}

                  <div tw="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
                    <PanelCard>
                      {days.length === 0 && (
                        <Muted>
                          No days yet. Click “Add Day” and set the date and intervals (e.g., walk-in April 20 → 11:00–19:00).
                        </Muted>
                      )}
                      {days.map((day, dIdx) => (
                        <DayCard key={dIdx}>
                          <div tw="flex flex-wrap items-center justify-between gap-2">
                            <span tw="text-sm font-bold text-gray-800">Day {dIdx + 1}</span>
                            <DangerBtn type="button" onClick={() => removeDay(dIdx)}>
                              <TrashIcon tw="w-4 h-4" />
                              Remove Day
                            </DangerBtn>
                          </div>
                          <Row>
                            <div>
                              <Label>Date</Label>
                              <Input
                                tw="mt-1 px-4 py-3"
                                type="date"
                                value={day.date || ""}
                                onChange={(e) => updateDay(dIdx, { date: e.target.value })}
                                required
                              />
                            </div>
                            <div>
                              <Label>Optional note</Label>
                              <TextArea
                                placeholder="E.g., Cash only"
                                value={day.note || ""}
                                onChange={(e) => updateDay(dIdx, { note: e.target.value })}
                              />
                            </div>
                          </Row>
                          <Label tw="mt-4 block">Intervals (max. 4)</Label>
                          {(day.intervals || []).map((iv, iIdx) => (
                            <IntervalRow key={iIdx}>
                              <div>
                                <Label>Start</Label>
                                <Input
                                  tw="mt-1 w-32 px-3 py-2"
                                  type="time"
                                  value={iv.start || ""}
                                  onChange={(e) => updateInterval(dIdx, iIdx, { start: e.target.value })}
                                  required
                                />
                              </div>
                              <div>
                                <Label>End</Label>
                                <Input
                                  tw="mt-1 w-32 px-3 py-2"
                                  type="time"
                                  value={iv.end || ""}
                                  onChange={(e) => updateInterval(dIdx, iIdx, { end: e.target.value })}
                                  required
                                />
                              </div>
                              <DangerBtn type="button" tw="mb-1" onClick={() => removeInterval(dIdx, iIdx)}>
                                Remove interval
                              </DangerBtn>
                            </IntervalRow>
                          ))}
                          <SecondaryBtn
                            type="button"
                            tw="mt-3"
                            onClick={() => addInterval(dIdx)}
                            disabled={(day.intervals || []).length >= 4}
                          >
                            <PlusIcon tw="w-4 h-4" />
                            Add interval
                          </SecondaryBtn>
                        </DayCard>
                      ))}
                    </PanelCard>

                    <div>
                      <PreviewTitle>Preview (as shown on the site)</PreviewTitle>
                      <PreviewShell tw="mt-2">
                        {!previewPick && (
                          <p tw="text-sm text-gray-300 text-center">
                            No content to show yet. Once you add a day with hours, the red section on the homepage will
                            update automatically.
                          </p>
                        )}
                        {previewPick && (
                          <>
                            <PreviewHeading>
                              {previewIsToday ? "Walk-In Racing Today" : "Upcoming Walk-In"}
                            </PreviewHeading>
                            <PreviewDescription>
                              {previewPick.day.note?.trim()
                                ? previewPick.day.note.trim()
                                : "First come, first served. No reservation required. Just show up and race!"}
                            </PreviewDescription>
                            <PreviewStatsRow>
                              {previewIsToday ? (
                                <>
                                  <div>
                                    <PreviewStatValue>{previewHoursText}</PreviewStatValue>
                                    <PreviewStatKey>Today's Hours</PreviewStatKey>
                                  </div>
                                  <div>
                                    <PreviewStatValue>{previewStatus}</PreviewStatValue>
                                    <PreviewStatKey>Status</PreviewStatKey>
                                  </div>
                                  <div>
                                    <PreviewStatValue>8+</PreviewStatValue>
                                    <PreviewStatKey>Min. Age</PreviewStatKey>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div>
                                    <PreviewStatValue>{formatBannerDate(previewPick.day.date, "en")}</PreviewStatValue>
                                    <PreviewStatKey>Next Date</PreviewStatKey>
                                  </div>
                                  <div>
                                    <PreviewStatValue>{previewHoursText}</PreviewStatValue>
                                    <PreviewStatKey>Hours</PreviewStatKey>
                                  </div>
                                  <div>
                                    <PreviewStatValue>8+</PreviewStatValue>
                                    <PreviewStatKey>Min. Age</PreviewStatKey>
                                  </div>
                                </>
                              )}
                            </PreviewStatsRow>
                          </>
                        )}
                      </PreviewShell>
                    </div>
                  </div>
                </PanelRoot>
              </MainContent>
            )}
          </MainContainer>
          <IllustrationContainer>
            <IllustrationImage imageSrc={illustration} />
          </IllustrationContainer>
        </Content>
      </Container>
    </AnimationRevealPage>
  );
}
