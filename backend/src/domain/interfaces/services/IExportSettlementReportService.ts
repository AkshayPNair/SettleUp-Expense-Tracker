export interface IExportSettlementReportService {
    execute(groupId: string): Promise<string>;
}
