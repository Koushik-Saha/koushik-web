import React from 'react';
import { prisma } from '@/lib/prisma';
import { Shield, Eye, Monitor, MapPin, Calendar, ExternalLink } from 'lucide-react';

export const revalidate = 0; // Disable server component caching to ensure live logs

interface PageProps {
  searchParams: Promise<{ token?: string; page?: string }>;
}

export default async function AdminAnalyticsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const token = params.token;
  const page = parseInt(params.page || '1', 10);
  const pageSize = 10;
  const skip = (page - 1) * pageSize;
  
  // Use 'Koushik1995!' as default if ADMIN_TOKEN env variable is missing
  const adminToken = process.env.ADMIN_TOKEN || 'Koushik1995!';

  const formatLocation = (loc: string) => {
    try {
      return decodeURIComponent(loc);
    } catch {
      return loc;
    }
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      let start = Math.max(2, page - 1);
      let end = Math.min(totalPages - 1, page + 1);

      if (page <= 3) {
        end = 4;
      } else if (page >= totalPages - 2) {
        start = totalPages - 3;
      }

      if (start > 2) {
        pages.push('...');
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (end < totalPages - 1) {
        pages.push('...');
      }

      pages.push(totalPages);
    }
    return pages;
  };

  if (token !== adminToken) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white px-4">
        <div className="max-w-md w-full p-8 border border-zinc-800 rounded-lg text-center bg-zinc-900/50 backdrop-blur-md shadow-2xl">
          <div className="inline-flex p-3 rounded-full bg-indigo-500/10 text-indigo-400 mb-4">
            <Shield className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Admin Credentials Required</h1>
          <p className="text-zinc-400 text-sm mb-6">Please enter the administrator security token to access the analytics console.</p>
          <form method="GET" className="flex gap-2">
            <input 
              type="password" 
              name="token" 
              placeholder="Enter admin token..." 
              className="flex-1 px-4 py-2.5 bg-zinc-900 border border-zinc-700/80 rounded-md text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            />
            <button className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 rounded-md text-sm font-semibold text-white transition-colors duration-200 cursor-pointer">
              Verify
            </button>
          </form>
          <p className="text-xs text-zinc-600 mt-4">Hint: The default dev token is <code>Koushik1995!</code></p>
        </div>
      </div>
    );
  }

  // 1. Fetch Analytics Stats
  const [totalSessions, totalPageViews, totalClicks] = await Promise.all([
    prisma.session.count(),
    prisma.analyticsEvent.count({ where: { type: 'visit' } }),
    prisma.analyticsEvent.count({ where: { type: 'click' } })
  ]);

  const totalPages = Math.ceil(totalSessions / pageSize);

  // 2. Fetch recent sessions and their event histories (paginated)
  const sessions = await prisma.session.findMany({
    orderBy: { createdAt: 'desc' },
    skip,
    take: pageSize,
    include: {
      events: {
        orderBy: { createdAt: 'asc' }
      }
    }
  });

  // 3. Top Clicked Targets
  const topClicks = await prisma.analyticsEvent.groupBy({
    by: ['clickTarget'],
    where: { type: 'click', clickTarget: { not: null } },
    _count: {
      clickTarget: true
    },
    orderBy: {
      _count: {
        clickTarget: 'desc'
      }
    },
    take: 8
  });

  // 4. Top Pages Visited
  const topPages = await prisma.analyticsEvent.groupBy({
    by: ['pageUrl'],
    where: { type: 'visit' },
    _count: {
      pageUrl: true
    },
    orderBy: {
      _count: {
        pageUrl: 'desc'
      }
    },
    take: 8
  });

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-2.5">
              <span>📊</span> Portfolio Analytics Console
            </h1>
            <p className="text-zinc-400 text-sm mt-1">Real-time database analytics tracking visits, sessions, and click coordinates.</p>
          </div>
          <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-md px-3.5 py-1.5 text-xs text-indigo-400 font-mono font-medium">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            LIVE DATABASE
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Card 1 */}
          <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-xl p-6 shadow-sm backdrop-blur">
            <div className="flex items-center justify-between">
              <span className="text-zinc-400 text-sm font-semibold">Total Sessions</span>
              <span className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg">
                <Monitor className="w-5 h-5" />
              </span>
            </div>
            <div className="mt-4">
              <span className="text-4xl font-extrabold tracking-tight text-white">{totalSessions}</span>
              <span className="text-xs text-zinc-500 block mt-1">Unique visitor sessions tracked</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-xl p-6 shadow-sm backdrop-blur">
            <div className="flex items-center justify-between">
              <span className="text-zinc-400 text-sm font-semibold">Page Views</span>
              <span className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg">
                <Eye className="w-5 h-5" />
              </span>
            </div>
            <div className="mt-4">
              <span className="text-4xl font-extrabold tracking-tight text-white">{totalPageViews}</span>
              <span className="text-xs text-zinc-500 block mt-1">Total page entries recorded</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-xl p-6 shadow-sm backdrop-blur">
            <div className="flex items-center justify-between">
              <span className="text-zinc-400 text-sm font-semibold">Interaction Clicks</span>
              <span className="p-2 bg-orange-500/10 text-orange-400 rounded-lg">
                <span>🖱️</span>
              </span>
            </div>
            <div className="mt-4">
              <span className="text-4xl font-extrabold tracking-tight text-white">{totalClicks}</span>
              <span className="text-xs text-zinc-500 block mt-1">Total button/link clicks resolved</span>
            </div>
          </div>
        </div>

        {/* Dashboard Sections Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Activity Feed (Left Column - Span 2) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span>🔄</span> Recent Activity Stream
              </h2>
              <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                {sessions.length === 0 ? (
                  <p className="text-zinc-500 text-sm text-center py-10">No sessions recorded yet.</p>
                ) : (
                  sessions.map((session) => (
                    <div key={session.id} className="border-l-2 border-zinc-800 pl-4 py-1 space-y-2 relative">
                      <div className="absolute -left-1.5 top-2.5 w-3 h-3 rounded-full bg-indigo-500 border-2 border-[#09090b]"></div>
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2 text-sm font-bold text-white">
                          <span>{session.ip}</span>
                          <span className="text-xs font-normal text-zinc-400 px-2 py-0.5 rounded bg-zinc-800 flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                            {formatLocation(session.location)}
                          </span>
                        </div>
                        <span className="text-xs text-zinc-500 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(session.createdAt).toLocaleDateString()} {new Date(session.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>

                      {/* Display Client Meta */}
                      <p className="text-xs text-zinc-400 font-mono truncate max-w-full">
                        Resolution: <span className="text-zinc-300 font-semibold">{session.screenResolution}</span> | 
                        Lang: <span className="text-zinc-300 font-semibold">{session.language}</span> | 
                        Browser: <span className="text-zinc-500">{session.userAgent.slice(0, 70)}...</span>
                      </p>

                      {/* Event Log inside this session */}
                      <div className="mt-2 pl-3 py-1.5 bg-zinc-950/60 rounded border border-zinc-800/50 space-y-1">
                        <p className="text-[10px] text-zinc-500 tracking-wider font-semibold uppercase">Interaction Log</p>
                        {session.events.length === 0 ? (
                          <p className="text-xs text-zinc-600 italic">No events generated.</p>
                        ) : (
                          session.events.map((event) => (
                            <div key={event.id} className="flex items-start justify-between gap-4 text-xs font-mono py-0.5">
                              <span className="flex items-center gap-1">
                                {event.type === 'visit' ? (
                                  <span className="text-emerald-400 font-bold">📄 Visit</span>
                                ) : (
                                  <span className="text-orange-400 font-bold">🖱️ Click</span>
                                )}
                                <span className="text-zinc-400 break-all">{event.pageUrl}</span>
                              </span>
                              {event.clickTarget && (
                                <span className="text-indigo-400 text-right max-w-xs truncate" title={event.clickTarget}>
                                  {event.clickTarget}
                                </span>
                              )}
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Pagination controls */}
              <div className="flex flex-col xl:flex-row items-center justify-between border-t border-zinc-800/80 pt-4 mt-6 gap-4 text-xs">
                <div className="text-zinc-500 font-medium">
                  Showing <span className="font-semibold text-zinc-300">{totalSessions === 0 ? 0 : skip + 1}</span> to{' '}
                  <span className="font-semibold text-zinc-300">
                    {Math.min(skip + pageSize, totalSessions)}
                  </span>{' '}
                  of <span className="font-semibold text-zinc-300">{totalSessions}</span> sessions
                </div>
                {totalPages > 1 && (
                  <div className="flex flex-wrap items-center gap-1.5">
                    {/* First button */}
                    {page > 1 ? (
                      <a
                        href={`/admin/analytics?token=${token}&page=1`}
                        className="px-2.5 py-1.5 bg-zinc-900 border border-zinc-800/80 hover:bg-zinc-800 rounded font-semibold text-zinc-300 transition-colors"
                        title="First Page"
                      >
                        First
                      </a>
                    ) : (
                      <span className="px-2.5 py-1.5 bg-zinc-900/20 border border-zinc-800/40 rounded font-semibold text-zinc-600 cursor-not-allowed">
                        First
                      </span>
                    )}

                    {/* Previous button */}
                    {page > 1 ? (
                      <a
                        href={`/admin/analytics?token=${token}&page=${page - 1}`}
                        className="px-2.5 py-1.5 bg-zinc-900 border border-zinc-800/80 hover:bg-zinc-800 rounded font-semibold text-zinc-300 transition-colors"
                      >
                        Prev
                      </a>
                    ) : (
                      <span className="px-2.5 py-1.5 bg-zinc-900/20 border border-zinc-800/40 rounded font-semibold text-zinc-600 cursor-not-allowed">
                        Prev
                      </span>
                    )}

                    {/* Page numbers */}
                    {getPageNumbers().map((p, idx) => {
                      if (p === '...') {
                        return (
                          <span key={`dots-${idx}`} className="px-2.5 py-1.5 text-zinc-500 font-semibold">
                            ...
                          </span>
                        );
                      }
                      const isCurrent = p === page;
                      return (
                        <a
                          key={`page-${p}`}
                          href={`/admin/analytics?token=${token}&page=${p}`}
                          className={`px-3 py-1.5 rounded font-semibold transition-colors ${
                            isCurrent
                              ? 'bg-indigo-600 text-white border border-indigo-500'
                              : 'bg-zinc-900 border border-zinc-800/80 text-zinc-300 hover:bg-zinc-800'
                          }`}
                        >
                          {p}
                        </a>
                      );
                    })}

                    {/* Next button */}
                    {page < totalPages ? (
                      <a
                        href={`/admin/analytics?token=${token}&page=${page + 1}`}
                        className="px-2.5 py-1.5 bg-zinc-900 border border-zinc-800/80 hover:bg-zinc-800 rounded font-semibold text-zinc-300 transition-colors"
                      >
                        Next
                      </a>
                    ) : (
                      <span className="px-2.5 py-1.5 bg-zinc-900/20 border border-zinc-800/40 rounded font-semibold text-zinc-600 cursor-not-allowed">
                        Next
                      </span>
                    )}

                    {/* Last button */}
                    {page < totalPages ? (
                      <a
                        href={`/admin/analytics?token=${token}&page=${totalPages}`}
                        className="px-2.5 py-1.5 bg-zinc-900 border border-zinc-800/80 hover:bg-zinc-800 rounded font-semibold text-zinc-300 transition-colors"
                        title="Last Page"
                      >
                        Last
                      </a>
                    ) : (
                      <span className="px-2.5 py-1.5 bg-zinc-900/20 border border-zinc-800/40 rounded font-semibold text-zinc-600 cursor-not-allowed">
                        Last
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Aggregates (Right Column - Span 1) */}
          <div className="space-y-6">
            
            {/* Top Visited Pages */}
            <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-xl p-6 shadow-sm">
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <span>🔗</span> Top Visited Pages
              </h2>
              <div className="space-y-3">
                {topPages.length === 0 ? (
                  <p className="text-zinc-500 text-xs text-center py-4">No page visits logged.</p>
                ) : (
                  topPages.map((page, idx) => (
                    <div key={page.pageUrl} className="flex items-center justify-between text-sm py-1.5 border-b border-zinc-800/50 last:border-0">
                      <div className="flex items-center gap-2 truncate">
                        <span className="text-xs font-bold text-zinc-500 w-5">#{idx + 1}</span>
                        <span className="text-zinc-300 font-mono truncate max-w-[150px] sm:max-w-xs">{page.pageUrl}</span>
                      </div>
                      <span className="px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono font-bold text-xs">
                        {page._count.pageUrl} views
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Top Clicked Interactive Elements */}
            <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-xl p-6 shadow-sm">
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <span>🎯</span> Popular Clicks
              </h2>
              <div className="space-y-3">
                {topClicks.length === 0 ? (
                  <p className="text-zinc-500 text-xs text-center py-4">No click events logged.</p>
                ) : (
                  topClicks.map((click, idx) => (
                    <div key={click.clickTarget} className="flex flex-col gap-1 py-2.5 border-b border-zinc-800/50 last:border-0">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2 truncate">
                          <span className="text-xs font-bold text-zinc-500 w-5">#{idx + 1}</span>
                          <span className="text-indigo-400 font-mono truncate text-xs max-w-[180px]" title={click.clickTarget || ''}>
                            {click.clickTarget?.split(' ')[0] || click.clickTarget}
                          </span>
                        </div>
                        <span className="px-2 py-0.5 rounded bg-orange-500/10 text-orange-400 font-mono font-bold text-xs">
                          {click._count.clickTarget} clicks
                        </span>
                      </div>
                      {click.clickTarget && click.clickTarget.includes('"') && (
                        <span className="text-xs text-zinc-400 pl-7 truncate italic">
                          {click.clickTarget.slice(click.clickTarget.indexOf('"'))}
                        </span>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
