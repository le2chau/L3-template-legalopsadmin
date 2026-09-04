'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';

import '@ui5/webcomponents-icons/dist/home.js';
import '@ui5/webcomponents-icons/dist/add.js';
import '@ui5/webcomponents-icons/dist/business-objects-experience.js';
import '@ui5/webcomponents-icons/dist/org-chart.js';
import '@ui5/webcomponents-icons/dist/inventory.js';
import '@ui5/webcomponents-icons/dist/geographic-bubble-chart.js';
import '@ui5/webcomponents-icons/dist/request.js';
import '@ui5/webcomponents-icons/dist/cart-approval.js';
import '@ui5/webcomponents-icons/dist/receipt.js';
import '@ui5/webcomponents-icons/dist/filter-analytics.js';
import '@ui5/webcomponents-icons/dist/feedback.js';
import '@ui5/webcomponents-icons/dist/bell.js';
import '@ui5/webcomponents-icons/dist/sys-help.js';
import '@ui5/webcomponents-icons/dist/key-user-settings.js';
import '@ui5/webcomponents-icons/dist/decline.js';
import '@ui5/webcomponents-icons/dist/accept.js';
import '@ui5/webcomponents-icons/dist/slim-arrow-up.js';
import '@ui5/webcomponents-icons/dist/slim-arrow-down.js';
import '@ui5/webcomponents-icons/dist/alert.js';
import '@ui5/webcomponents-icons/dist/compare.js';
import '@ui5/webcomponents-icons/dist/warning.js';
import '@ui5/webcomponents-icons/dist/document.js';
import '@ui5/webcomponents-icons/dist/edit.js';
import '@ui5/webcomponents-icons/dist/menu2.js';
import '@ui5/webcomponents-icons/dist/da.js';
import '@ui5/webcomponents-icons/dist/overflow.js';
import '@ui5/webcomponents-icons/dist/search.js';
import '@ui5/webcomponents-icons/dist/value-help.js';
import '@ui5/webcomponents-icons/dist/appointment-2.js';
import '@ui5/webcomponents-icons/dist/sys-enter-2.js';

import {
  ShellBar,
  ShellBarItem,
  SideNavigation,
  Icon,
  SideNavigationItem,
  SideNavigationSubItem,
  Breadcrumbs,
  BreadcrumbsItem,
  Button,
  Input,
  Label,
  MultiInput,
  Token,
  Select,
  Option,
  MultiComboBox,
  MultiComboBoxItem,
  TextArea,
  Tag,
  Avatar,
  Title,
  Text,
  FlexBox,
  MessageStrip,
  TabContainer,
  Tab,
  Bar,
  Dialog,
  RadioButton,
  AnalyticalTable,
  Link,
} from '@ui5/webcomponents-react';

//  Types

type ClauseState = 'imported' | 'new' | 'duplicate' | 'verified' | 'standard';

interface Clause {
  id: string;
  title: string;
  importedLanguage: string;
  state: ClauseState;
  libraryMatch?: string;
  libraryId?: string;
  libraryLanguage?: string;
  status?: string;
  governingLaw?: string;
  language?: string;
}

interface Section {
  id: string;
  title: string;
  clauses: Clause[];
}

//  Sample data

const INITIAL_SECTIONS: Section[] = [
  {
    id: 's1',
    title: 'Parties',
    clauses: [
      {
        id: 'c1',
        title: 'Supplier',
        importedLanguage:
          'The Supplier is the legal entity that provides the services described herein. The Supplier warrants that it has the capacity, authority, and expertise to fulfill all obligations under this agreement.',
        state: 'new',
      },
      {
        id: 'c2',
        title: 'Definitions',
        importedLanguage:
          '"Confidential Information" means any data or information disclosed by either party that is designated as confidential or that reasonably should be understood to be confidential given the nature of the information.',
        state: 'duplicate',
        libraryMatch: 'Definitions',
        libraryId: 'LIB-042',
        libraryLanguage:
          '"Confidential Information" means all information disclosed by a party to the other party, whether orally or in writing, that is designated as confidential. This is the current library-approved version.',
        governingLaw: 'US • EU',
        language: 'English',
      },
    ],
  },
  {
    id: 's2',
    title: 'Terms & Conditions',
    clauses: [
      {
        id: 'c3',
        title: 'Scope of Services',
        importedLanguage:
          'The services shall be performed as described in the attached Statement of Work. Any changes to scope must be mutually agreed in writing via a Change Order.',
        state: 'new',
      },
      {
        id: 'c4',
        title: 'Confidentiality',
        importedLanguage:
          'Each party agrees to keep confidential all non-public information disclosed by the other party and to use such information only for the purposes of this agreement.',
        state: 'new',
      },
      {
        id: 'c5',
        title: 'Intellectual Property',
        importedLanguage:
          'All deliverables created by the Supplier under this agreement shall be considered work made for hire and shall be the sole property of the Buyer upon full payment.',
        state: 'duplicate',
        libraryMatch: 'Intellectual Property',
        libraryId: 'LIB-055',
        libraryLanguage:
          'All work product, inventions, and deliverables created by the Supplier in connection with this agreement shall be deemed works made for hire and shall vest exclusively in the Buyer upon creation.',
        governingLaw: 'US',
        language: 'English',
      },
      {
        id: 'c9',
        title: 'Limitation of Liability',
        importedLanguage:
          'Neither party shall be liable to the other for any indirect, incidental, special, consequential, or punitive damages arising out of or related to this agreement, even if advised of the possibility of such damages.',
        state: 'new',
      },
      {
        id: 'c10',
        title: 'Termination',
        importedLanguage:
          'Either party may terminate this agreement upon thirty (30) days written notice. Termination for cause may be effected immediately upon written notice if the other party materially breaches this agreement.',
        state: 'new',
      },
    ],
  },
  {
    id: 's3',
    title: 'Payment',
    clauses: [
      {
        id: 'c6',
        title: 'Fees',
        importedLanguage:
          'The Buyer shall pay the Supplier the fees set out in the attached fee schedule. All amounts are in the agreed currency and are exclusive of applicable taxes.',
        state: 'new',
      },
      {
        id: 'c7',
        title: 'Payment Terms',
        importedLanguage:
          'Invoices are due within thirty (30) days of receipt. Late payments shall accrue interest at a rate of 1.5% per month from the due date until paid in full.',
        state: 'new',
      },
      {
        id: 'c11',
        title: 'Late Payment',
        importedLanguage:
          'If any undisputed amount is not paid by the due date, the Buyer shall pay a late payment fee of 1.5% per month on the outstanding balance, calculated from the due date until the date of actual payment.',
        state: 'new',
      },
    ],
  },
  {
    id: 's4',
    title: 'Signature',
    clauses: [
      {
        id: 'c8',
        title: 'Authorized Signatories',
        importedLanguage:
          'This agreement shall be executed by duly authorized representatives of each party. Electronic signatures are accepted and shall have the same legal effect as handwritten signatures.',
        state: 'new',
      },
      {
        id: 'c12',
        title: 'Counterparts',
        importedLanguage:
          'This agreement may be executed in one or more counterparts, each of which shall be deemed an original and all of which together shall constitute one and the same instrument.',
        state: 'new',
      },
    ],
  },
];

//  Helpers

function ClauseStateTag({ state }: { state: ClauseState }) {
  if (state === 'duplicate') return <Tag design="Set2" colorScheme="3" icon={<Icon slot="icon" name="alert" />}>Duplicate</Tag>;
  if (state === 'new') return <Tag design="Information">New</Tag>;
  if (state === 'standard') return <Tag design="Set2" colorScheme="10">Standard</Tag>;
  if (state === 'verified') return <Tag design="Set2" colorScheme="4" icon={<Icon slot="icon" name="sys-enter-2" />}>Verified</Tag>;
  return null;
}

function swapItems<T>(arr: T[], i: number, j: number): T[] {
  if (i < 0 || j < 0 || i >= arr.length || j >= arr.length) return arr;
  const next = [...arr];
  [next[i], next[j]] = [next[j], next[i]];
  return next;
}

//  Clause catalog (library clauses available to add)

interface CatalogClause {
  id: string;
  title: string;
  libraryId: string;
  status: 'Active' | 'Draft';
  linkedTemplates: string[];
  governingLaw: string;
  language: string;
  lastModified: string;
  importedLanguage: string;
}

const CLAUSE_CATALOG: CatalogClause[] = [
  {
    id: 'cat-1',
    title: 'Limitation of Liability',
    libraryId: 'CL-001',
    status: 'Draft',
    linkedTemplates: ['Statement of Work', 'Service Agreement'],
    governingLaw: 'US • EU',
    language: 'English',
    lastModified: 'Oct 28, 2025',
    importedLanguage:
      'Neither party shall be liable to the other for any indirect, incidental, special, consequential, or punitive damages arising out of or related to this agreement, even if advised of the possibility of such damages.',
  },
  {
    id: 'cat-2',
    title: 'Payment Terms',
    libraryId: 'CL-002',
    status: 'Active',
    linkedTemplates: ['Service Agreement'],
    governingLaw: 'APAC',
    language: 'English',
    lastModified: 'Oct 15, 2025',
    importedLanguage:
      'Invoices are due within thirty (30) days of receipt. Late payments shall accrue interest at a rate of 1.5% per month from the due date until paid in full.',
  },
  {
    id: 'cat-3',
    title: 'Governing Law with Properties',
    libraryId: 'CL-003',
    status: 'Active',
    linkedTemplates: ['Procurement Agreement', 'Goods Agreement'],
    governingLaw: 'EU',
    language: 'English',
    lastModified: 'Oct 15, 2025',
    importedLanguage:
      'This agreement shall be governed by and construed in accordance with the laws of the jurisdiction specified in the applicable order form, without regard to its conflict of law provisions.',
  },
  {
    id: 'cat-4',
    title: 'Force Majeure',
    libraryId: 'CL-004',
    status: 'Active',
    linkedTemplates: ['Service Agreement', 'Procurement Agreement'],
    governingLaw: 'US',
    language: 'English',
    lastModified: 'Sep 30, 2025',
    importedLanguage:
      'Neither party shall be in default or liable for any delay or failure to perform its obligations if such delay or failure arises from circumstances beyond its reasonable control.',
  },
  {
    id: 'cat-5',
    title: 'Dispute Resolution',
    libraryId: 'CL-005',
    status: 'Active',
    linkedTemplates: ['Master Services Agreement'],
    governingLaw: 'US • EU',
    language: 'English',
    lastModified: 'Sep 12, 2025',
    importedLanguage:
      'Any dispute arising out of or in connection with this agreement shall first be attempted to be resolved through good-faith negotiation between the parties, failing which it shall be submitted to binding arbitration.',
  },
];

//  Add Clause Value Help Dialog

let _clauseIdCounter = 100;

function AddClauseDialog({ open, onClose, onConfirm, excludeIds = new Set() }: {
  open: boolean;
  onClose: () => void;
  onConfirm: (clauses: CatalogClause[]) => void;
  excludeIds?: Set<string>;
}) {
  const [searchText, setSearchText] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState<'search' | 'conditions'>('search');
  const [conditions, setConditions] = useState<Array<{ id: string; operator: string; value: string }>>([
    { id: '1', operator: 'contains', value: '' },
  ]);

  const tablePaddingHook = useCallback((hooks: any) => {
    hooks.getCellProps.push((props: any, { cell }: any) => {
      if (cell?.column?.id === '__ui5wcr__internal_selection_column') return [props];
      return [props, { style: { ...props.style, paddingInlineStart: '1rem', paddingInlineEnd: '1rem' } }];
    });
    hooks.getHeaderProps.push((props: any, meta: any) => {
      if (meta?.column?.id === '__ui5wcr__internal_selection_column') return [props];
      return [props, { style: { ...props.style, paddingInlineStart: '1rem', paddingInlineEnd: '1rem' } }];
    });
  }, []);

  const filtered = CLAUSE_CATALOG.filter((c) => {
    if (excludeIds.has(c.libraryId)) return false;
    if (!searchText.trim()) return true;
    const q = searchText.toLowerCase();
    return c.title.toLowerCase().includes(q) || c.libraryId.toLowerCase().includes(q);
  });

  const selectedClauses = CLAUSE_CATALOG.filter((c) => selectedIds.has(c.id));

  const removeToken = (id: string) =>
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });

  const handleConfirm = () => {
    onConfirm(selectedClauses);
    setSelectedIds(new Set());
    setSearchText('');
    setShowFilters(false);
    setActiveTab('search');
    setConditions([{ id: '1', operator: 'contains', value: '' }]);
  };

  const handleClose = () => {
    setSelectedIds(new Set());
    setSearchText('');
    setShowFilters(false);
    setActiveTab('search');
    setConditions([{ id: '1', operator: 'contains', value: '' }]);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      style={{ '--_ui5_popup_content_padding_block': '0' } as React.CSSProperties}
      header={
        <div style={{ width: '100%' }}>
          <div style={{ padding: '1rem 0 0.5rem', fontWeight: 'bold', fontSize: 'var(--sapFontHeader5Size)', color: 'var(--sapPageHeader_TextColor)' }}>
            Clause
          </div>
          <TabContainer
            collapsed
            onTabSelect={(e) => {
              const tab = (e.detail as unknown as { tab: { dataset: { key: string } } }).tab;
              setActiveTab(tab.dataset.key as 'search' | 'conditions');
            }}
            style={{ width: 'calc(100% + 4rem)', marginInline: '-2rem' }}
          >
            <Tab text="Search and Select" selected={activeTab === 'search'} data-key="search" />
            <Tab text="Define Conditions" selected={activeTab === 'conditions'} data-key="conditions" />
          </TabContainer>
        </div>
      }
      footer={
        <Bar design="Footer" endContent={
          <>
            <Button design="Emphasized" onClick={handleConfirm}>OK</Button>
            <Button design="Transparent" onClick={handleClose}>Cancel</Button>
          </>
        } />
      }
    >
      <div style={{ width: '860px', maxWidth: '92vw', display: 'flex', flexDirection: 'column', height: '560px' }}>

        {activeTab === 'search' && (<>
        {/* Search bar row */}
        <div style={{ padding: '1rem 0 0.75rem' }}>
          <FlexBox alignItems="Center" style={{ gap: '0.75rem' }}>
            <Input
              value={searchText}
              placeholder="Search"
              onInput={(e) => setSearchText((e.target as unknown as HTMLInputElement).value)}
              style={{ flex: 1 }}
              accessibleName="Search clauses"
            />
            <Button design="Emphasized" onClick={() => {}}>Go</Button>
            <Button design="Transparent" onClick={() => setShowFilters((v) => !v)}>
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </Button>
          </FlexBox>

          {/* Filter fields */}
          {showFilters && (
            <div style={{ marginTop: '1rem', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem 1.5rem' }}>
              {['Clause ID', 'Clause Name', 'Status', 'Linked Templates', 'Governing Law', 'Language', 'Last Modified'].map((label) => (
                <div key={label}>
                  <Label showColon style={{ display: 'block', marginBottom: '0.25rem' }}>{label}</Label>
                  <Input style={{ width: '100%' }} accessibleName={label}>
                    <Icon slot="icon" name="value-help" />
                  </Input>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info strip */}
        <div style={{ padding: '0.75rem 0 0' }}>
          <MessageStrip design="Information" hideCloseButton>
            Selected clauses will be added to the first section of the document outline. You could rearrange later.
          </MessageStrip>
        </div>

        {/* Table */}
        <div style={{ padding: '0.75rem 0 0' }}>
          <Text style={{ fontWeight: 'bold', fontSize: 'var(--sapFontSize)', display: 'block', marginBottom: '0.5rem' }}>
            Items ({filtered.length})
          </Text>
          <AnalyticalTable
            tableHooks={[tablePaddingHook]}
            data={filtered}
            selectionMode="Multiple"
            visibleRows={Math.max(1, filtered.length)}
            minRows={Math.max(1, filtered.length)}
            rowHeight={60}
            headerRowHeight={32}
            selectedRowIds={Object.fromEntries(
              filtered.map((c, i) => [i, selectedIds.has(c.id)])
            )}
            onRowSelect={(e) => {
              const ids = new Set(
                Object.entries((e.detail as unknown as { selectedRowIds: Record<string, boolean> }).selectedRowIds)
                  .filter(([, v]) => v)
                  .map(([k]) => filtered[Number(k)]?.id)
                  .filter(Boolean) as string[]
              );
              setSelectedIds(ids);
            }}
            columns={[
              {
                Header: 'Clause',
                accessor: 'title',
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                Cell: (({ row }: any) => (
                  <div>
                    <Text style={{ fontSize: 'var(--sapFontSize)', display: 'block' }}>{row.original.title}</Text>
                    <Text style={{ fontSize: 'var(--sapFontSize)', color: 'var(--sapContent_LabelColor)', marginTop: '8px', display: 'block' }}>{row.original.libraryId}</Text>
                  </div>
                )) as any,
              },
              {
                Header: 'Status',
                accessor: 'status',
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                Cell: (({ value }: any) => value === 'Active'
                  ? <Tag design="Set2" colorScheme="4" icon={<Icon slot="icon" name="sys-enter-2" />}>Active</Tag>
                  : <Tag design="Set2" colorScheme="10">Draft</Tag>
                ) as any,
              },
              {
                Header: 'Linked Templates',
                accessor: 'linkedTemplates',
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                Cell: (({ value }: any) => (
                  <Text style={{ fontSize: 'var(--sapFontSize)' }}>{(value as string[]).join(' • ')}</Text>
                )) as any,
              },
              { Header: 'Governing Law', accessor: 'governingLaw' },
              { Header: 'Language', accessor: 'language' },
              { Header: 'Last Modified', accessor: 'lastModified', hAlign: 'End' },
            ]}
          />
        </div>
        </>)}

        {activeTab === 'conditions' && (
          <div style={{ padding: '1rem 0' }}>
            {conditions.map((cond, idx) => (
              <FlexBox key={cond.id} alignItems="Center" style={{ gap: '0.5rem', marginBottom: '0.5rem' }}>
                <Select
                  style={{ width: '180px' }}
                  onChange={(e) => {
                    const val = (e.detail as unknown as { selectedOption: { value: string } }).selectedOption.value;
                    setConditions((prev) => prev.map((c) => c.id === cond.id ? { ...c, operator: val } : c));
                  }}
                >
                  <Option value="contains" selected={cond.operator === 'contains'}>contains</Option>
                  <Option value="equal to" selected={cond.operator === 'equal to'}>equal to</Option>
                  <Option value="starts with" selected={cond.operator === 'starts with'}>starts with</Option>
                  <Option value="ends with" selected={cond.operator === 'ends with'}>ends with</Option>
                </Select>
                <Input
                  style={{ flex: 1 }}
                  placeholder="Value"
                  value={cond.value}
                  onInput={(e) => {
                    const val = (e.target as unknown as HTMLInputElement).value;
                    setConditions((prev) => prev.map((c) => c.id === cond.id ? { ...c, value: val } : c));
                  }}
                />
                <Button
                  design="Transparent"
                  icon="decline"
                  accessibleName="Remove condition"
                  disabled={conditions.length === 1 && idx === 0}
                  onClick={() => setConditions((prev) => prev.filter((c) => c.id !== cond.id))}
                />
              </FlexBox>
            ))}
            {/* Add Condition aligned to right edge of input (offset by Select width + gaps + × button width) */}
            <FlexBox style={{ paddingInlineStart: 'calc(180px + 0.5rem)' }}>
              <div style={{ flex: 1 }} />
              <Button
                design="Default"
                onClick={() => setConditions((prev) => [...prev, { id: String(Date.now()), operator: 'contains', value: '' }])}
              >
                Add Condition
              </Button>
              <div style={{ width: 'calc(2.25rem + 0.5rem)' }} />
            </FlexBox>
          </div>
        )}

        {/* Selected tokens */}
        <div style={{ padding: '1rem 0', marginTop: 'auto' }}>
          <Text style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: 'var(--sapTextColor)' }}>
            {selectedIds.size === 0 ? 'No Items or Conditions Selected' : `Selected Items and Conditions (${selectedIds.size})`}
          </Text>
          <FlexBox alignItems="Center" style={{ gap: '0.25rem' }}>
            <MultiInput
              style={{ flex: 1 }}
              accessibleName="Selected clauses"
              disabled={selectedIds.size === 0}
              showClearIcon
              onTokenDelete={(e) => {
                const deleted = (e.detail as unknown as { tokens: Array<{ text: string }> }).tokens;
                deleted.forEach((t) => {
                  const clause = selectedClauses.find((c) => `${c.title} (${c.libraryId})` === t.text);
                  if (clause) removeToken(clause.id);
                });
              }}
              tokens={selectedClauses.map((c) => (
                <Token key={c.id} text={`${c.title} (${c.libraryId})`} />
              ))}
            />
            <Button
              design="Transparent"
              icon="decline"
              accessibleName="Clear all selected"
              disabled={selectedIds.size === 0}
              onClick={() => setSelectedIds(new Set())}
            />
          </FlexBox>
        </div>
      </div>
    </Dialog>
  );
}

//  Variant A: Split Panel (60/40, TOC-first) — Option 6 resolution

function VariantA() {
  const [sections, setSections] = useState<Section[]>(INITIAL_SECTIONS);
  const [selectedId, setSelectedId] = useState<string | null>('c2');
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [resolvedDupes, setResolvedDupes] = useState<Record<string, 'library' | 'new'>>({});
  const [renameValues, setRenameValues] = useState<Record<string, string>>({});
  const [compareOpen6, setCompareOpen6] = useState(false);
  const [resolveChoice6, setResolveChoice6] = useState<'library' | 'new'>('library');
  const [langCompareExpanded6, setLangCompareExpanded6] = useState(true);
  const [newName6, setNewName6] = useState('');
  const [newNameError6, setNewNameError6] = useState<string | null>(null);
  const [addClauseOpen, setAddClauseOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(INITIAL_SECTIONS.map((s) => s.id))
  );

  const allClauses = sections.flatMap((s) => s.clauses);
  const selected = allClauses.find((c) => c.id === selectedId) ?? null;
  const selectedPosition = (() => {
    for (let si = 0; si < sections.length; si++) {
      const ci = sections[si].clauses.findIndex((c) => c.id === selectedId);
      if (ci !== -1) return { si, ci };
    }
    return null;
  })();
  const totalClauses = allClauses.length;
  const issueCount = allClauses.filter(
    (c) => c.state === 'duplicate' && !resolvedDupes[c.id]
  ).length;

  const toggleSection = (sid: string) =>
    setExpandedSections((prev) => {
      const next = new Set(prev);
      next.has(sid) ? next.delete(sid) : next.add(sid);
      return next;
    });

  const moveSection = (idx: number, dir: -1 | 1) =>
    setSections((prev) => swapItems(prev, idx, idx + dir));

  const removeSection = (sid: string) =>
    setSections((prev) => prev.filter((s) => s.id !== sid));

  const moveClause = (sid: string, cIdx: number, dir: -1 | 1) =>
    setSections((prev) => {
      const sIdx = prev.findIndex((s) => s.id === sid);
      if (sIdx === -1) return prev;
      const section = prev[sIdx];
      const targetIdx = cIdx + dir;

      if (targetIdx >= 0 && targetIdx < section.clauses.length) {
        return prev.map((s) =>
          s.id === sid ? { ...s, clauses: swapItems(s.clauses, cIdx, targetIdx) } : s
        );
      }

      if (dir === -1 && sIdx > 0) {
        const clause = section.clauses[cIdx];
        return prev.map((s, i) => {
          if (i === sIdx) return { ...s, clauses: s.clauses.filter((_, j) => j !== cIdx) };
          if (i === sIdx - 1) return { ...s, clauses: [...s.clauses, clause] };
          return s;
        });
      }

      if (dir === 1 && sIdx < prev.length - 1) {
        const clause = section.clauses[cIdx];
        return prev.map((s, i) => {
          if (i === sIdx) return { ...s, clauses: s.clauses.filter((_, j) => j !== cIdx) };
          if (i === sIdx + 1) return { ...s, clauses: [clause, ...s.clauses] };
          return s;
        });
      }

      return prev;
    });

  const removeClause = (sid: string, cid: string) =>
    setSections((prev) =>
      prev.map((s) =>
        s.id === sid ? { ...s, clauses: s.clauses.filter((c) => c.id !== cid) } : s
      )
    );

  const resolveDupe = (cid: string, choice: 'library' | 'new', nameOverride?: string) => {
    setResolvedDupes((p) => ({ ...p, [cid]: choice }));
    if (choice === 'new') {
      const clause = allClauses.find((c) => c.id === cid);
      setRenameValues((p) => ({ ...p, [cid]: nameOverride ?? ((clause?.title ?? '') + ' (Imported)') }));
    }
  };

  const handleAddClauses = (catalogClauses: CatalogClause[]) => {
    const newClauses: Clause[] = catalogClauses.map((c) => ({
      id: `added-${++_clauseIdCounter}`,
      title: c.title,
      importedLanguage: c.importedLanguage,
      state: 'standard' as ClauseState,
      libraryId: c.libraryId,
      status: c.status,
      governingLaw: c.governingLaw,
      language: c.language,
    }));
    setSections((prev) => {
      if (prev.length === 0) return prev;
      return prev.map((s, i) =>
        i === 0 ? { ...s, clauses: [...s.clauses, ...newClauses] } : s
      );
    });
    setAddClauseOpen(false);
  };

  return (
    <>
    <FlexBox
      style={{
        height: '560px',
        borderRadius: '4px',
        overflow: 'hidden',
        gap: '20px',
      }}
    >
      {/*  Left TOC (70%)  */}
      <div
        style={{
          width: '70%',
          display: 'flex',
          flexDirection: 'column',
          background: 'var(--sapGroup_ContentBackground)',
          borderRadius: '12px',
          overflow: 'hidden',
        }}
      >
        {/* TOC header */}
        <FlexBox
          alignItems="Center"
          justifyContent="SpaceBetween"
          style={{
            padding: '0.6rem 1rem',
            borderBottom: '1px solid var(--sapGroup_ContentBorderColor)',
            flexShrink: 0,
          }}
        >
          <Text style={{ fontWeight: 'bold', fontSize: 'var(--sapFontSize)' }}>
            Outline
          </Text>
          <Button icon="add" design="Transparent" accessibleName="Add clause" onClick={() => setAddClauseOpen(true)}>Add Clause</Button>
        </FlexBox>

        {/* Section list */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {sections.map((section, sIdx) => (
            <div key={section.id} style={{ borderBottom: '1px solid var(--sapGroup_ContentBorderColor)' }}>
              {/* Section header */}
              <FlexBox
                alignItems="Center"
                justifyContent="SpaceBetween"
                style={{
                  padding: '0.5rem 0.75rem',
                  background: 'var(--sapList_GroupHeaderBackground)',
                  cursor: 'pointer',
                }}
                onClick={() => { toggleSection(section.id); setSelectedId(section.id); }}
                onMouseEnter={() => setHoveredId(section.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <FlexBox alignItems="Center" style={{ gap: '0.5rem' }}>
                  <span style={{ fontSize: 'var(--sapFontSmallSize)', color: 'var(--sapContent_LabelColor)' }}>
                    {expandedSections.has(section.id) ? '▾' : '▸'}
                  </span>
                  <Text style={{ fontWeight: 'bold', fontSize: 'var(--sapFontSize)' }}>{sIdx + 1}. {section.title}</Text>
                </FlexBox>
                <FlexBox style={{ gap: '0.15rem', visibility: (selectedId === section.id || hoveredId === section.id) ? 'visible' : 'hidden' }} onClick={(e) => e.stopPropagation()}>
                    <Button icon="slim-arrow-up" design="Transparent" accessibleName="Move section up" tooltip="Move up" onClick={() => moveSection(sIdx, -1)} />
                    <Button icon="slim-arrow-down" design="Transparent" accessibleName="Move section down" tooltip="Move down" onClick={() => moveSection(sIdx, 1)} />
                  </FlexBox>
              </FlexBox>

              {/* Clause rows */}
              {expandedSections.has(section.id) && (
                <div>
                  {section.clauses.map((clause, cIdx) => {
                    const effectiveState: ClauseState =
                      resolvedDupes[clause.id] ? 'verified' : clause.state;
                    const isSelected = selectedId === clause.id;
                    return (
                      <div
                        key={clause.id}
                        style={{
                          borderBottom: '1px solid var(--sapList_BorderColor)',
                          background: isSelected
                            ? 'var(--sapList_SelectionBackgroundColor)'
                            : 'transparent',
                        }}
                      >
                        {/* Clause title row */}
                        <FlexBox
                          alignItems="Center"
                          justifyContent="SpaceBetween"
                          style={{ padding: '0.45rem 0.75rem 0.45rem 1.5rem', cursor: 'pointer' }}
                          onClick={() => setSelectedId(clause.id)}
                          onMouseEnter={() => setHoveredId(clause.id)}
                          onMouseLeave={() => setHoveredId(null)}
                        >
                          <FlexBox alignItems="Center" style={{ gap: '0.5rem', minWidth: 0 }}>
                            <Text style={{ fontSize: 'var(--sapFontSize)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {sIdx + 1}.{cIdx + 1} {clause.title}
                            </Text>
                            <ClauseStateTag state={effectiveState} />
                          </FlexBox>
                            <FlexBox style={{ gap: '0.15rem', flexShrink: 0, visibility: (isSelected || hoveredId === clause.id) ? 'visible' : 'hidden' }} onClick={(e) => e.stopPropagation()}>
                              <Button icon="slim-arrow-up" design="Transparent" accessibleName="Move clause up" tooltip="Move up" onClick={() => moveClause(section.id, cIdx, -1)} />
                              <Button icon="slim-arrow-down" design="Transparent" accessibleName="Move clause down" tooltip="Move down" onClick={() => moveClause(section.id, cIdx, 1)} />
                              <Button icon="decline" design="Transparent" accessibleName="Remove clause" tooltip="Remove from outline" onClick={() => removeClause(section.id, clause.id)} />
                            </FlexBox>
                        </FlexBox>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/*  Right reference panel (30%)  */}
      <div
        style={{
          width: '30%',
          overflowY: 'auto',
          padding: '1rem 1.25rem',
          background: '#ffffff',
          borderRadius: '12px',
          display: 'flex',
          flexDirection: 'column',
          fontSize: 'var(--sapFontSize)',
        }}
      >
        {!selected ? (
          <div style={{ margin: 'auto', textAlign: 'center' }}>
            <Text style={{ color: 'var(--sapContent_LabelColor)', fontSize: 'var(--sapFontSize)' }}>
              Select a clause on the left to preview its language.
            </Text>
          </div>
        ) : selected.state === 'new' ? (
          <>
            {/* Header */}
            <FlexBox alignItems="Center" style={{ gap: '0.5rem', marginBottom: '1rem', minHeight: '2rem' }}>
              <Text style={{ fontWeight: 'bold', fontSize: 'var(--sapFontSize)' }}>
                {selectedPosition ? `${selectedPosition.si + 1}.${selectedPosition.ci + 1} ` : ''}{selected.title}
              </Text>
              <Tag design="Information">New</Tag>
            </FlexBox>

            {/* Info strip */}
            <FlexBox
              alignItems="Start"
              style={{
                gap: '0.5rem',
                padding: '0.5rem 0.75rem',
                marginBottom: '1rem',
                background: 'var(--sapIndicationColor_10b_Background)',
                border: '1px solid var(--sapIndicationColor_10b_BorderColor)',
                borderRadius: '0.5rem',
              }}
            >
              <Icon name="accept" style={{ color: 'var(--sapTextColor)', flexShrink: 0 }} />
              <Text style={{ fontSize: 'var(--sapFontSize)', color: 'var(--sapTextColor)' }}>
                Added to the clause library automatically when the template is created. You can adjust the content later in the Clause Library once it is created.
              </Text>
            </FlexBox>

            <Text style={{ fontSize: 'var(--sapFontSize)', color: 'var(--sapContent_LabelColor)', display: 'block', marginBottom: '0.4rem' }}>
              Imported Language:
            </Text>
            <Text>
              {selected.importedLanguage}
            </Text>
          </>
        ) : selected.state !== 'duplicate' ? (
          <>
            {/* Header: icon + link + ID */}
            <FlexBox alignItems="Center" style={{ gap: '0.5rem', marginBottom: '1rem', minHeight: '2rem' }}>
              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                title="Open in library"
                style={{ color: 'var(--sapLinkColor)', fontWeight: 'bold', fontSize: 'var(--sapFontSize)', textDecoration: 'none' }}
                onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
                onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
              >
                {selectedPosition ? `${selectedPosition.si + 1}.${selectedPosition.ci + 1} ` : ''}{selected.title}
              </a>
              {selected.libraryId && (
                <Text style={{ fontSize: 'var(--sapFontSize)', color: 'var(--sapContent_LabelColor)' }}>
                  ({selected.libraryId})
                </Text>
              )}
            </FlexBox>

            <Text style={{ fontSize: 'var(--sapFontSize)', color: 'var(--sapContent_LabelColor)', display: 'block', marginBottom: '0.4rem' }}>
              Language:
            </Text>
            <Text style={{ display: 'block', marginBottom: '1.25rem' }}>
              {selected.importedLanguage}
            </Text>

            <FlexBox style={{ gap: '2rem' }}>
              <div>
                <Text style={{ fontSize: 'var(--sapFontSize)', color: 'var(--sapContent_LabelColor)', display: 'block', marginBottom: '0.25rem' }}>Governing Law:</Text>
                <Text style={{ fontSize: 'var(--sapFontSize)' }}>{selected.governingLaw ?? '—'}</Text>
              </div>
              <div>
                <Text style={{ fontSize: 'var(--sapFontSize)', color: 'var(--sapContent_LabelColor)', display: 'block', marginBottom: '0.25rem' }}>Language:</Text>
                <Text style={{ fontSize: 'var(--sapFontSize)' }}>{selected.language ?? '—'}</Text>
              </div>
            </FlexBox>
          </>
        ) : (
          /* duplicate state */
          <>
            {/* Header */}
            <FlexBox alignItems="Center" style={{ gap: '0.5rem', marginBottom: '1rem', minHeight: '2rem' }}>
              {resolvedDupes[selected.id] === 'library' ? (
                <a href="#" target="_blank" rel="noreferrer" title="Open in library"
                  style={{ fontWeight: 'bold', fontSize: 'var(--sapFontSize)', color: 'var(--sapLinkColor)', textDecoration: 'none' }}
                  onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
                  onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
                >
                  {selectedPosition ? `${selectedPosition.si + 1}.${selectedPosition.ci + 1} ` : ''}{selected.title}
                </a>
              ) : (
                <Text style={{ fontWeight: 'bold', fontSize: 'var(--sapFontSize)' }}>
                  {selectedPosition ? `${selectedPosition.si + 1}.${selectedPosition.ci + 1} ` : ''}
                  {resolvedDupes[selected.id] === 'new' && renameValues[selected.id]
                    ? renameValues[selected.id]
                    : selected.title}
                </Text>
              )}
              {selected.libraryId && resolvedDupes[selected.id] === 'library' && (
                <Text style={{ fontSize: 'var(--sapFontSize)', color: 'var(--sapContent_LabelColor)' }}>({selected.libraryId})</Text>
              )}
              {resolvedDupes[selected.id]
                ? <Tag design="Set2" colorScheme="4" icon={<Icon slot="icon" name="sys-enter-2" />}>Verified</Tag>
                : <Tag design="Set2" colorScheme="3" icon={<Icon slot="icon" name="alert" />}>Duplicate</Tag>
              }
            </FlexBox>

            {/* UNRESOLVED */}
            {!resolvedDupes[selected.id] && (
              <div style={{ marginBottom: '1rem' }}>
                <MessageStrip design="Critical" hideCloseButton>
                  {selected.title} has the same name as an existing clause in the library: "{selected.libraryMatch}".
                </MessageStrip>
              </div>
            )}

            {/* RESOLVED: use existing */}
            {resolvedDupes[selected.id] === 'library' && (
              <>
                <MessageStrip design="Positive" style={{ marginBottom: '1rem' }}>
                  Imported language is replaced with an existing language from the clause library
                </MessageStrip>
                <Text style={{ fontSize: 'var(--sapFontSize)', color: 'var(--sapContent_LabelColor)', display: 'block', marginBottom: '0.4rem' }}>
                  Language:
                </Text>
            <Text style={{ display: 'block', marginBottom: '1.25rem' }}>
                  {selected.libraryLanguage ?? selected.importedLanguage}
                </Text>
                <FlexBox style={{ gap: '2rem', marginBottom: '1rem' }}>
                  <div>
                    <Text style={{ fontSize: 'var(--sapFontSize)', color: 'var(--sapContent_LabelColor)', display: 'block', marginBottom: '0.25rem' }}>Governing Law:</Text>
                    <Text style={{ fontSize: 'var(--sapFontSize)' }}>{selected.governingLaw ?? '—'}</Text>
                  </div>
                  <div>
                    <Text style={{ fontSize: 'var(--sapFontSize)', color: 'var(--sapContent_LabelColor)', display: 'block', marginBottom: '0.25rem' }}>Language:</Text>
                    <Text style={{ fontSize: 'var(--sapFontSize)' }}>{selected.language ?? '—'}</Text>
                  </div>
                </FlexBox>
                <div style={{ borderTop: '1px solid var(--sapGroup_ContentBorderColor)', marginBottom: '1rem' }} />
                <FlexBox justifyContent="End">
                  <Button design="Transparent" onClick={() => {
                    setResolvedDupes((p) => { const n = { ...p }; delete n[selected.id]; return n; });
                    setNewName6(''); setNewNameError6(null);
                  }}>
                    Undo
                  </Button>
                </FlexBox>
              </>
            )}

            {/* RESOLVED: add as new */}
            {resolvedDupes[selected.id] === 'new' && (
              <>
                <MessageStrip design="Positive" style={{ marginBottom: '1rem' }}>
                  This clause will be added to the clause library under a different name
                </MessageStrip>
                <Text style={{ fontSize: 'var(--sapFontSize)', color: 'var(--sapContent_LabelColor)', display: 'block', marginBottom: '0.4rem' }}>
                  Imported Language:
                </Text>
            <Text style={{ display: 'block', marginBottom: '1.25rem' }}>
                  {selected.importedLanguage}
                </Text>
                <div style={{ borderTop: '1px solid var(--sapGroup_ContentBorderColor)', marginBottom: '1rem' }} />
                <FlexBox justifyContent="End">
                  <Button design="Transparent" onClick={() => {
                    setResolvedDupes((p) => { const n = { ...p }; delete n[selected.id]; return n; });
                    setNewName6(''); setNewNameError6(null);
                  }}>
                    Undo
                  </Button>
                </FlexBox>
              </>
            )}

            {/* Imported language — shown when unresolved */}
            {!resolvedDupes[selected.id] && (
              <>
                <Text style={{ fontSize: 'var(--sapFontSize)', color: 'var(--sapContent_LabelColor)', display: 'block', marginBottom: '0.4rem' }}>
                  Imported Language:
                </Text>
            <Text style={{ display: 'block', marginBottom: '1.25rem' }}>
                  {selected.importedLanguage}
                </Text>
              </>
            )}

            {/* Divider + Compare & Resolve button — unresolved only */}
            {!resolvedDupes[selected.id] && (
              <>
                <div style={{ borderTop: '1px solid var(--sapGroup_ContentBorderColor)', marginBottom: '1rem' }} />
                <FlexBox justifyContent="End">
                  <Button design="Default" onClick={() => { setResolveChoice6('library'); setCompareOpen6(true); }}>
                    Compare &amp; Resolve
                  </Button>
                </FlexBox>
              </>
            )}

            {/* Compare & Resolve Dialog */}
            <Dialog
              open={compareOpen6}
              headerText="Clause Comparison"
              onClose={() => setCompareOpen6(false)}
              footer={
                <Bar design="Footer" endContent={
                  <>
                    <Button design="Emphasized" onClick={() => {
                      if (resolveChoice6 === 'new') {
                        if (!newName6.trim()) {
                          setNewNameError6('Name is required');
                          return;
                        }
                        const nameLower = newName6.trim().toLowerCase();
                        const allLibraryTitles = [
                          ...CLAUSE_CATALOG.map(c => c.title.toLowerCase()),
                          ...INITIAL_SECTIONS.flatMap(s => s.clauses).flatMap(c => [
                            c.title.toLowerCase(),
                            ...(c.libraryMatch ? [c.libraryMatch.toLowerCase()] : []),
                          ]),
                        ];
                        if (allLibraryTitles.includes(nameLower)) {
                          setNewNameError6('This name already exists in the clause library');
                          return;
                        }
                        setNewNameError6(null);
                        resolveDupe(selected.id, 'new', newName6.trim());
                      } else {
                        resolveDupe(selected.id, resolveChoice6);
                      }
                      setCompareOpen6(false);
                    }}>Confirm</Button>
                    <Button design="Transparent" onClick={() => setCompareOpen6(false)}>Close</Button>
                  </>
                } />
              }
            >
              <div style={{ width: '640px', maxWidth: '85vw', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {/* Warning strip */}
                <MessageStrip design="Critical" hideCloseButton>
                  Clause '{selected.title}' has the same name as an existing library clause. Rename it or link to the existing clause.{' '}
                  <Link href="#">Open clause</Link>
                </MessageStrip>

                {/* Language Comparison collapsible panel */}
                <div style={{ background: 'var(--sapGroup_ContentBackground)', borderRadius: '8px', overflow: 'hidden' }}>
                  <FlexBox
                    alignItems="Center"
                    style={{ gap: '0.5rem', padding: '0.75rem 1rem', cursor: 'pointer', borderBottom: langCompareExpanded6 ? '1px solid var(--sapGroup_ContentBorderColor)' : 'none' }}
                    onClick={() => setLangCompareExpanded6((v) => !v)}
                  >
                    <span style={{ color: 'var(--sapContent_LabelColor)', fontSize: 'var(--sapFontSize)' }}>
                      {langCompareExpanded6 ? '▾' : '▸'}
                    </span>
                    <Text style={{ fontWeight: 'bold', fontSize: 'var(--sapFontSize)' }}>Language Comparison</Text>
                  </FlexBox>
                  {langCompareExpanded6 && (
                    <div style={{ display: 'flex', gap: 0, padding: '1rem' }}>
                      <div style={{ flex: 1, paddingRight: '1rem' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 'var(--sapFontSize)', display: 'block', marginBottom: '0.75rem' }}>
                          {selected.title}{' '}
                          <span style={{ color: 'var(--sapContent_LabelColor)', fontWeight: 'normal' }}>(Imported)</span>
                        </Text>
                        <Text style={{ fontSize: 'var(--sapFontSize)', lineHeight: '1.6' }}>
                          {selected.importedLanguage}
                        </Text>
                      </div>
                      <div style={{ width: '1px', background: 'var(--sapGroup_ContentBorderColor)', flexShrink: 0 }} />
                      <div style={{ flex: 1, paddingLeft: '1rem' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 'var(--sapFontSize)', display: 'block', marginBottom: '0.75rem' }}>
                          <a href="#" target="_blank" rel="noreferrer" style={{ color: 'var(--sapLinkColor)', textDecoration: 'none' }}
                            onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
                            onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
                          >{selected.libraryMatch}</a>{' '}
                          <span style={{ color: 'var(--sapContent_LabelColor)', fontWeight: 'normal' }}>({selected.libraryId})</span>
                        </Text>
                        <Text style={{ fontSize: 'var(--sapFontSize)', lineHeight: '1.6' }}>
                          {selected.libraryLanguage ?? selected.importedLanguage}
                        </Text>
                      </div>
                    </div>
                  )}
                </div>

                {/* Choose how to resolve */}
                <div>
                  <Text style={{ fontWeight: 'bold', fontSize: 'var(--sapFontSize)', display: 'block', marginBottom: '0.75rem' }}>
                    Choose how to resolve
                  </Text>
                  <div style={{ marginBottom: '0.75rem' }}>
                    <RadioButton
                      name="resolve6"
                      text="Use existing clause in library"
                      checked={resolveChoice6 === 'library'}
                      onChange={() => setResolveChoice6('library')}
                    />
                    <Text style={{ fontSize: 'var(--sapFontSize)', color: 'var(--sapContent_LabelColor)', display: 'block', marginLeft: '1.75rem', marginTop: '0.2rem' }}>
                      This template will reference the existing clause in the library. The imported content will be discarded.
                    </Text>
                  </div>
                  <div>
                    <RadioButton
                      name="resolve6"
                      text="Add as new clause under a different name"
                      checked={resolveChoice6 === 'new'}
                      onChange={() => { setResolveChoice6('new'); setNewNameError6(null); }}
                    />
                    <Text style={{ fontSize: 'var(--sapFontSize)', color: 'var(--sapContent_LabelColor)', display: 'block', marginLeft: '1.75rem', marginTop: '0.2rem' }}>
                      Creates a new library clause with the imported content under a different name. Both clauses will exist.
                    </Text>
                    {resolveChoice6 === 'new' && (
                      <div style={{ marginLeft: '1.75rem', marginTop: '0.5rem' }}>
                        <FlexBox alignItems="Center" style={{ gap: '0.5rem' }}>
                          <Text style={{ fontSize: 'var(--sapFontSize)', whiteSpace: 'nowrap' }}>
                            New name: <span style={{ color: 'var(--sapNegativeColor)' }}>*</span>
                          </Text>
                          <Input
                            value={newName6}
                            placeholder="Enter a new clause name"
                            valueState={newNameError6 ? 'Negative' : 'None'}
                            onInput={(e) => { setNewName6((e.target as unknown as HTMLInputElement).value); setNewNameError6(null); }}
                            style={{ flex: 1 }}
                            accessibleName="New clause name"
                          />
                        </FlexBox>
                        {newNameError6 && (
                          <Text style={{ fontSize: 'var(--sapFontSize)', color: 'var(--sapNegativeColor)', display: 'block', marginTop: '0.25rem' }}>
                            {newNameError6}
                          </Text>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Dialog>
          </>
        )}
      </div>
    </FlexBox>

    <AddClauseDialog
      open={addClauseOpen}
      onClose={() => setAddClauseOpen(false)}
      onConfirm={handleAddClauses}
      excludeIds={new Set(sections.flatMap(s => s.clauses.map(c => c.libraryId).filter((id): id is string => !!id)))}
    />
    </>
  );
}

//  Variant section wrapper

function VariantSection({ number, title, subtitle, children }: {
  number: string; title: string; subtitle: string; children: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: '3rem' }}>
      <div style={{ marginBottom: '1rem' }}>
        <FlexBox alignItems="Center" style={{ gap: '0.5rem', marginBottom: '0.2rem' }}>
          <span style={{ background: 'var(--sapBrandColor)', color: '#fff', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'var(--sapFontSize)', fontWeight: 'bold', flexShrink: 0 }}>
            {number}
          </span>
          <Title level="H3">{title}</Title>
        </FlexBox>
        <Text style={{ color: 'var(--sapContent_LabelColor)', fontSize: 'var(--sapFontSize)', paddingLeft: '2rem' }}>
          {subtitle}
        </Text>
      </div>
      {children}
    </div>
  );
}

//  Main content panel (tabs + scrollable body + footer)

function MainContent() {
  const [activeTab, setActiveTab] = useState<'header' | 'outline'>('header');
  const scrollRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const outlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveTab(entry.target.id as 'header' | 'outline');
        });
      },
      { root: container, threshold: 0.3 }
    );
    if (headerRef.current) observer.observe(headerRef.current);
    if (outlineRef.current) observer.observe(outlineRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Anchor tab bar */}
      <TabContainer
        headerBackgroundDesign="Solid"
        contentBackgroundDesign="Transparent"
        onTabSelect={(e) => {
          const id = (e.detail.tab as unknown as { getAttribute: (k: string) => string }).getAttribute('data-id');
          if (id === 'header') { setActiveTab('header'); headerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
          if (id === 'outline') { setActiveTab('outline'); outlineRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
        }}
        style={{ flexShrink: 0 }}
      >
        <Tab text="Header" data-id="header" selected={activeTab === 'header'} />
        <Tab text="Outline" data-id="outline" selected={activeTab === 'outline'} />
      </TabContainer>

      {/* Scrollable body */}
      <div ref={scrollRef} style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '1.5rem 3rem 2rem' }}>

                  {/* Header section */}
                  <div id="header" ref={headerRef} style={{ marginBottom: '3rem' }}>
                    <Title level="H4" size="H4" style={{ marginBottom: '1.25rem' }}>Header</Title>
                    <div style={{ background: 'var(--sapGroup_ContentBackground)', borderRadius: '8px', padding: '1.5rem' }}>
                      {/* Title — full width */}
                      <div style={{ marginBottom: '1.25rem' }}>
                        <Text style={{ fontSize: 'var(--sapFontSize)', color: 'var(--sapContent_LabelColor)', display: 'block', marginBottom: '0.3rem' }}>
                          Title: <span style={{ color: 'var(--sapNegativeColor)' }}>*</span>
                        </Text>
                        <Input value="New Legal Agreement Template" style={{ width: '100%' }} accessibleName="Title" />
                      </div>

                      {/* Row 1: Contract Types | Governing Law | Valid From */}
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem 2rem', marginBottom: '1.25rem' }}>
                        <div>
                          <Text style={{ fontSize: 'var(--sapFontSize)', color: 'var(--sapContent_LabelColor)', display: 'block', marginBottom: '0.3rem' }}>
                            Contract Types: <span style={{ color: 'var(--sapNegativeColor)' }}>*</span>
                          </Text>
                          <Input style={{ width: '100%' }} accessibleName="Contract Types">
                            <Icon slot="icon" name="value-help" style={{ cursor: 'pointer' }} />
                          </Input>
                        </div>
                        <div>
                          <Text style={{ fontSize: 'var(--sapFontSize)', color: 'var(--sapContent_LabelColor)', display: 'block', marginBottom: '0.3rem' }}>
                            Governing Law: <span style={{ color: 'var(--sapNegativeColor)' }}>*</span>
                          </Text>
                          <Input style={{ width: '100%' }} accessibleName="Governing Law">
                            <Icon slot="icon" name="value-help" style={{ cursor: 'pointer' }} />
                          </Input>
                        </div>
                        <div style={{ minWidth: 0 }}>
                          <Text style={{ fontSize: 'var(--sapFontSize)', color: 'var(--sapContent_LabelColor)', display: 'block', marginBottom: '0.3rem' }}>
                            Valid From:
                          </Text>
                          <Input style={{ width: '100%' }} accessibleName="Valid From">
                            <Icon slot="icon" name="appointment-2" style={{ cursor: 'pointer' }} />
                          </Input>
                        </div>
                      </div>

                      {/* Row 2: Owner | Language | Valid To */}
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem 2rem', marginBottom: '1.25rem' }}>
                        <div>
                          <Text style={{ fontSize: 'var(--sapFontSize)', color: 'var(--sapContent_LabelColor)', display: 'block', marginBottom: '0.3rem' }}>
                            Owner: <span style={{ color: 'var(--sapNegativeColor)' }}>*</span>
                          </Text>
                          <Input value="Alexander Dan" style={{ width: '100%' }} accessibleName="Owner">
                            <Icon slot="icon" name="value-help" style={{ cursor: 'pointer' }} />
                          </Input>
                        </div>
                        <div>
                          <Text style={{ fontSize: 'var(--sapFontSize)', color: 'var(--sapContent_LabelColor)', display: 'block', marginBottom: '0.3rem' }}>
                            Language: <span style={{ color: 'var(--sapNegativeColor)' }}>*</span>
                          </Text>
                          <Input style={{ width: '100%' }} accessibleName="Language">
                            <Icon slot="icon" name="value-help" style={{ cursor: 'pointer' }} />
                          </Input>
                        </div>
                        <div style={{ minWidth: 0 }}>
                          <Text style={{ fontSize: 'var(--sapFontSize)', color: 'var(--sapContent_LabelColor)', display: 'block', marginBottom: '0.3rem' }}>
                            Valid To:
                          </Text>
                          <Input style={{ width: '100%' }} accessibleName="Valid To">
                            <Icon slot="icon" name="appointment-2" style={{ cursor: 'pointer' }} />
                          </Input>
                        </div>
                      </div>

                      {/* Description — full width */}
                      <div>
                        <Text style={{ fontSize: 'var(--sapFontSize)', color: 'var(--sapContent_LabelColor)', display: 'block', marginBottom: '0.3rem' }}>
                          Description:
                        </Text>
                        <TextArea rows={4} style={{ width: '100%' }} accessibleName="Description" />
                      </div>
                    </div>
                  </div>

                  {/* Outline section */}
                  <div id="outline" ref={outlineRef}>
                    <Title level="H4" size="H4" style={{ marginBottom: '1.25rem' }}>Outline</Title>
                    <VariantA />
                  </div>

                </div>

                {/* Footer — direct flex child, always visible at bottom */}
                <div style={{ flexShrink: 0, padding: '0 3rem 1rem' }}>
                  <Bar design="FloatingFooter" endContent={
                    <>
                      <Button design="Emphasized">Create</Button>
                      <Button design="Transparent">Discard</Button>
                    </>
                  } />
                </div>
              </>
  );
}

//  Page

export default function ImportReviewPage() {
  const [navCollapsed, setNavCollapsed] = useState(false);
  return (
    <div className="ui5-content-density-compact" style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      <ShellBar
        primaryTitle="Ariba"
        logo={<img src="https://www.sap.com/dam/application/shared/logos/sap-logo-svg.svg" alt="SAP" style={{ height: '24px' }} />}
        startButton={<Button slot="startButton" icon="menu2" design="Transparent" onClick={() => setNavCollapsed(c => !c)} />}
        showNotifications
        notificationsCount="1"
        profile={<Avatar slot="profile" initials="CE" accessibleName="Profile" colorScheme="Accent6" />}
      >
        <ShellBarItem icon="da" text="Joule" />
        <ShellBarItem icon="feedback" text="Give Feedback to SAP" />
        <ShellBarItem icon="sys-help" text="Help Center" />
      </ShellBar>

      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        <SideNavigation
          collapsed={navCollapsed}
          style={{ flexShrink: 0 }}
          fixedItems={
            <>
              <SideNavigationItem slot="fixedItems" text="Create" icon="add" />
              <SideNavigationItem slot="fixedItems" text="Administration Center" icon="key-user-settings" />
            </>
          }
        >
          <SideNavigationItem text="Home" icon="home" />
          <SideNavigationItem text="Spend Insights" icon="business-objects-experience">
            <SideNavigationSubItem text="Spend Taxonomies" />
            <SideNavigationSubItem text="Supplier Enrichment" />
            <SideNavigationSubItem text="Spend Categorization" />
            <SideNavigationSubItem text="Spend Dashboards" />
          </SideNavigationItem>
          <SideNavigationItem text="Category Management" icon="org-chart">
            <SideNavigationSubItem text="Category Profile" />
            <SideNavigationSubItem text="Strategy and Plan" />
            <SideNavigationSubItem text="Strategy Execution" />
            <SideNavigationSubItem text="Initiatives" />
            <SideNavigationSubItem text="Toolkit" />
          </SideNavigationItem>
          <SideNavigationItem text="Suppliers" icon="inventory">
            <SideNavigationSubItem text="Supplier List" />
            <SideNavigationSubItem text="Evaluations" />
          </SideNavigationItem>
          <SideNavigationItem text="Sourcing" icon="geographic-bubble-chart">
            <SideNavigationSubItem text="Requests" />
            <SideNavigationSubItem text="Aggregation" />
            <SideNavigationSubItem text="Projects" />
            <SideNavigationSubItem text="Events" />
            <SideNavigationSubItem text="Project Templates" />
            <SideNavigationSubItem text="Event Templates" />
            <SideNavigationSubItem text="Term Library" />
            <SideNavigationSubItem text="Content Library" />
          </SideNavigationItem>
          <SideNavigationItem text="Contract Management" icon="request" expanded>
            <SideNavigationSubItem text="Contracts" selected />
            <SideNavigationSubItem text="Creation Jobs" />
          </SideNavigationItem>
          <SideNavigationItem text="Buying" icon="cart-approval">
            <SideNavigationSubItem text="Shopping" />
            <SideNavigationSubItem text="My Requests" />
            <SideNavigationSubItem text="Purchase Requests" />
            <SideNavigationSubItem text="Purchase Orders" />
            <SideNavigationSubItem text="Service Entry Sheets" />
            <SideNavigationSubItem text="Receipts" />
          </SideNavigationItem>
          <SideNavigationItem text="Invoicing" icon="receipt">
            <SideNavigationSubItem text="Invoices" />
            <SideNavigationSubItem text="Invoice Capture Template" />
          </SideNavigationItem>
          <SideNavigationItem text="Analytics" icon="filter-analytics">
            <SideNavigationSubItem text="Dashboards" />
          </SideNavigationItem>
        </SideNavigation>

        <div style={{ width: '1px', flexShrink: 0, background: '#c2cdd6', boxShadow: '2px 0 8px 0 rgba(34,53,72,.2)' }} />

        {/* Main content column */}
        <div style={{ flex: 1, minHeight: 0, background: 'var(--sapBackgroundColor)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {/* Page header */}
          <div style={{ flexShrink: 0, background: 'var(--sapGroup_ContentBackground)', padding: '0.75rem 3rem 1rem' }}>
            <div style={{ marginBottom: '0.5rem' }}>
              <Breadcrumbs>
                <BreadcrumbsItem>Home</BreadcrumbsItem>
                <BreadcrumbsItem>Contract Management: Contracts</BreadcrumbsItem>
                <BreadcrumbsItem>Contract</BreadcrumbsItem>
              </Breadcrumbs>
            </div>
            <Title level="H2" style={{ color: 'var(--sapTextColor)', fontSize: 'var(--sapObjectHeader_Title_FontSize)', fontWeight: '900', marginBottom: '2rem' }}>
              New Legal Agreement Template
            </Title>
            <FlexBox style={{ gap: '2rem', alignItems: 'flex-start' }}>
              <div>
                <Text style={{ fontSize: 'var(--sapFontLargeSize)', color: 'var(--sapTextColor)', display: 'block', marginBottom: '1rem' }}>Imported Section</Text>
                <Text style={{ fontSize: '24px', color: 'var(--sapTextColor)', fontWeight: 'normal' }}>4</Text>
              </div>
              <div>
                <Text style={{ fontSize: 'var(--sapFontLargeSize)', color: 'var(--sapTextColor)', display: 'block', marginBottom: '1rem' }}>Imported Clause</Text>
                <Text style={{ fontSize: '24px', color: 'var(--sapTextColor)', fontWeight: 'normal' }}>12</Text>
              </div>
              <div>
                <Text style={{ fontSize: 'var(--sapFontLargeSize)', color: 'var(--sapTextColor)', display: 'block', marginBottom: '1rem' }}>Issue to Resolve</Text>
                <FlexBox alignItems="Center" style={{ gap: '0.35rem' }}>
                  <Icon name="alert" style={{ color: 'var(--sapCriticalColor)' }} />
                  <Text style={{ fontSize: '24px', color: 'var(--sapTextColor)', fontWeight: 'normal' }}>2</Text>
                </FlexBox>
              </div>
            </FlexBox>
          </div>

          {/* Tabs + scroll + footer */}
          <MainContent />
        </div>
      </div>
    </div>
  );
}
