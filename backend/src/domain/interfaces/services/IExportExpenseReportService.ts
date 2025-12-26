export interface IExportExpenseReportService {
    execute(groupId: string): Promise<string>;
}
