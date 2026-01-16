'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Upload, 
  Download, 
  FileSpreadsheet,
  Users,
  UserCheck,
  Mail,
  Target,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle
} from 'lucide-react';
import { apiClient } from '@/lib/api-client';

interface ImportJob {
  id: string;
  type: string;
  file_name: string;
  status: string;
  total_rows: number;
  processed_rows: number;
  success_count: number;
  error_count: number;
  created_at: string;
  completed_at: string;
}

interface ExportJob {
  id: string;
  type: string;
  status: string;
  file_path: string;
  row_count: number;
  created_at: string;
  completed_at: string;
  expires_at: string;
}

const statusColors: Record<string, string> = {
  pending: 'bg-gray-100 text-gray-800',
  processing: 'bg-yellow-100 text-yellow-800',
  completed: 'bg-green-100 text-green-800',
  failed: 'bg-red-100 text-red-800',
};

const statusIcons: Record<string, any> = {
  pending: Clock,
  processing: Clock,
  completed: CheckCircle,
  failed: XCircle,
};

export default function ImportExportPage() {
  const [importJobs, setImportJobs] = useState<ImportJob[]>([]);
  const [exportJobs, setExportJobs] = useState<ExportJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'import' | 'export'>('import');
  const [importType, setImportType] = useState('customers');
  const [exportType, setExportType] = useState('customers');
  const [listId, setListId] = useState('');
  const [csvData, setCsvData] = useState('');
  const [importing, setImporting] = useState(false);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    loadData();
  }, [activeTab]);

  const loadData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'import') {
        const res = await apiClient.request('/admin/data/import/jobs', { method: 'GET' });
        if (res.success) setImportJobs(res.data || []);
      } else {
        const res = await apiClient.request('/admin/data/export/jobs', { method: 'GET' });
        if (res.success) setExportJobs(res.data || []);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setCsvData(event.target?.result as string);
    };
    reader.readAsText(file);
  };

  const parseCSV = (csv: string): any[] => {
    const lines = csv.split(/\r?\n/).filter(line => line.trim());
    if (lines.length < 2) return [];

    const headers = lines[0].split(',').map(h => h.trim().toLowerCase().replace(/\s+/g, '_').replace(/"/g, ''));
    const data: any[] = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim().replace(/^"|"$/g, ''));
      if (values.length === headers.length) {
        const row: any = {};
        headers.forEach((header, idx) => {
          row[header] = values[idx];
        });
        data.push(row);
      }
    }

    return data;
  };

  const handleImport = async () => {
    if (!csvData) {
      alert('Please upload a CSV file first');
      return;
    }

    const data = parseCSV(csvData);
    if (data.length === 0) {
      alert('No valid data found in CSV');
      return;
    }

    setImporting(true);
    try {
      const res = await apiClient.request('/admin/data/import', {
        method: 'POST',
        body: JSON.stringify({
          type: importType,
          data,
          list_id: importType === 'subscribers' ? listId : undefined,
        }),
      });

      if (res.success) {
        alert(`Import completed: ${res.data.successCount} success, ${res.data.errorCount} errors`);
        setCsvData('');
        loadData();
      } else {
        alert('Import failed: ' + res.message);
      }
    } catch (error) {
      console.error('Error importing:', error);
      alert('Import failed');
    } finally {
      setImporting(false);
    }
  };

  const handleExport = async () => {
    setExporting(true);
    try {
      const res = await apiClient.request('/admin/data/export', {
        method: 'POST',
        body: JSON.stringify({
          type: exportType,
          format: 'csv',
        }),
      });

      if (res.success) {
        alert(`Export started. ${res.data.rowCount} rows will be exported.`);
        loadData();
      } else {
        alert('Export failed: ' + res.message);
      }
    } catch (error) {
      console.error('Error exporting:', error);
      alert('Export failed');
    } finally {
      setExporting(false);
    }
  };

  const downloadExport = async (jobId: string) => {
    try {
      window.open(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/admin/data/export/download/${jobId}`, '_blank');
    } catch (error) {
      console.error('Error downloading:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Import / Export</h1>
          <p className="text-gray-600">Import and export data in CSV/Excel format</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b">
        <button
          onClick={() => setActiveTab('import')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'import'
              ? 'text-[#10b981] border-b-2 border-[#10b981]'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <Upload className="h-4 w-4 inline mr-2" />
          Import
        </button>
        <button
          onClick={() => setActiveTab('export')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'export'
              ? 'text-[#10b981] border-b-2 border-[#10b981]'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <Download className="h-4 w-4 inline mr-2" />
          Export
        </button>
      </div>

      {activeTab === 'import' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Import Form */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5 text-[#10b981]" />
                Import Data
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Import Type</label>
                <select
                  value={importType}
                  onChange={(e) => setImportType(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="customers">CRM Customers</option>
                  <option value="subscribers">Email Subscribers</option>
                </select>
              </div>

              {importType === 'subscribers' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email List ID</label>
                  <Input
                    value={listId}
                    onChange={(e) => setListId(e.target.value)}
                    placeholder="Enter list ID"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">CSV File</label>
                <div className="border-2 border-dashed rounded-lg p-6 text-center">
                  <FileSpreadsheet className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                  <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="csv-upload"
                  />
                  <label
                    htmlFor="csv-upload"
                    className="cursor-pointer text-[#10b981] hover:text-[#059669] font-medium"
                  >
                    Click to upload CSV
                  </label>
                  {csvData && (
                    <p className="mt-2 text-sm text-gray-500">
                      {parseCSV(csvData).length} rows ready to import
                    </p>
                  )}
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-700 mb-2">CSV Format</h4>
                <p className="text-sm text-gray-600">
                  {importType === 'customers' 
                    ? 'Required columns: email. Optional: first_name, last_name, phone, company'
                    : 'Required columns: email. Optional: first_name, last_name'}
                </p>
              </div>

              <Button
                onClick={handleImport}
                disabled={importing || !csvData}
                className="w-full bg-[#10b981] hover:bg-[#059669] text-white"
              >
                {importing ? 'Importing...' : 'Start Import'}
              </Button>
            </CardContent>
          </Card>

          {/* Import History */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Import History</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8 text-gray-500">Loading...</div>
              ) : importJobs.length === 0 ? (
                <div className="text-center py-8 text-gray-500">No import jobs found</div>
              ) : (
                <div className="space-y-3">
                  {importJobs.map((job) => {
                    const StatusIcon = statusIcons[job.status] || Clock;
                    return (
                      <div key={job.id} className="p-4 rounded-lg border">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-gray-900 capitalize">{job.type}</div>
                            <div className="text-sm text-gray-500">{job.file_name}</div>
                          </div>
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusColors[job.status]}`}>
                            <StatusIcon className="h-3 w-3" />
                            {job.status}
                          </span>
                        </div>
                        <div className="mt-2 flex gap-4 text-sm">
                          <span className="text-gray-600">Total: {job.total_rows}</span>
                          <span className="text-green-600">Success: {job.success_count}</span>
                          <span className="text-red-600">Errors: {job.error_count}</span>
                        </div>
                        <div className="mt-1 text-xs text-gray-400">
                          {new Date(job.created_at).toLocaleString()}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Export Form */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5 text-[#10b981]" />
                Export Data
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Export Type</label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: 'customers', label: 'CRM Customers', icon: UserCheck },
                    { value: 'leads', label: 'Leads', icon: Users },
                    { value: 'subscribers', label: 'Email Subscribers', icon: Mail },
                    { value: 'deals', label: 'Deals', icon: Target },
                  ].map((type) => {
                    const Icon = type.icon;
                    return (
                      <button
                        key={type.value}
                        onClick={() => setExportType(type.value)}
                        className={`p-4 rounded-lg border-2 text-left transition-all ${
                          exportType === type.value
                            ? 'border-[#10b981] bg-[#10b981]/5'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <Icon className={`h-6 w-6 mb-2 ${exportType === type.value ? 'text-[#10b981]' : 'text-gray-400'}`} />
                        <div className="font-medium text-gray-900">{type.label}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-700 mb-2">Export Format</h4>
                <p className="text-sm text-gray-600">
                  Data will be exported as CSV file compatible with Microsoft Excel.
                </p>
              </div>

              <Button
                onClick={handleExport}
                disabled={exporting}
                className="w-full bg-[#10b981] hover:bg-[#059669] text-white"
              >
                {exporting ? 'Exporting...' : 'Start Export'}
              </Button>
            </CardContent>
          </Card>

          {/* Export History */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Export History</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8 text-gray-500">Loading...</div>
              ) : exportJobs.length === 0 ? (
                <div className="text-center py-8 text-gray-500">No export jobs found</div>
              ) : (
                <div className="space-y-3">
                  {exportJobs.map((job) => {
                    const StatusIcon = statusIcons[job.status] || Clock;
                    const isExpired = job.expires_at && new Date(job.expires_at) < new Date();
                    return (
                      <div key={job.id} className="p-4 rounded-lg border">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-gray-900 capitalize">{job.type}</div>
                            <div className="text-sm text-gray-500">{job.row_count} rows</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusColors[job.status]}`}>
                              <StatusIcon className="h-3 w-3" />
                              {job.status}
                            </span>
                            {job.status === 'completed' && !isExpired && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => downloadExport(job.id)}
                              >
                                <Download className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                        <div className="mt-1 text-xs text-gray-400">
                          {new Date(job.created_at).toLocaleString()}
                          {isExpired && <span className="ml-2 text-red-500">(Expired)</span>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
