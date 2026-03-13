
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.22.0
 * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
 */
Prisma.prismaVersion = {
  client: "5.22.0",
  engine: "605197351a3c8bdd595af2d2a9bc3025bca48ea2"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.NotFoundError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`NotFoundError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  email: 'email',
  password: 'password',
  name: 'name',
  phone: 'phone',
  address: 'address',
  role: 'role',
  isActive: 'isActive',
  currentPropertyId: 'currentPropertyId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.RefreshTokenScalarFieldEnum = {
  id: 'id',
  token: 'token',
  userId: 'userId',
  expiresAt: 'expiresAt',
  createdAt: 'createdAt',
  isRevoked: 'isRevoked'
};

exports.Prisma.PropertyScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  name: 'name',
  address: 'address',
  type: 'type',
  subscriptionStatus: 'subscriptionStatus',
  planType: 'planType',
  solarCapacity: 'solarCapacity',
  batteryStorage: 'batteryStorage',
  installationDate: 'installationDate',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SurveyScalarFieldEnum = {
  id: 'id',
  propertyId: 'propertyId',
  propertyType: 'propertyType',
  roofArea: 'roofArea',
  monthlyBill: 'monthlyBill',
  monthlyConsumption: 'monthlyConsumption',
  peakHours: 'peakHours',
  occupants: 'occupants',
  appliances: 'appliances',
  status: 'status',
  submittedAt: 'submittedAt'
};

exports.Prisma.ProposalScalarFieldEnum = {
  id: 'id',
  propertyId: 'propertyId',
  surveyId: 'surveyId',
  solarCapacity: 'solarCapacity',
  batteryStorage: 'batteryStorage',
  monthlyFee: 'monthlyFee',
  estimatedSavings: 'estimatedSavings',
  estimatedProduction: 'estimatedProduction',
  contractDuration: 'contractDuration',
  installationFee: 'installationFee',
  securityDeposit: 'securityDeposit',
  whatsIncluded: 'whatsIncluded',
  generatedAt: 'generatedAt',
  expiresAt: 'expiresAt'
};

exports.Prisma.PaymentScalarFieldEnum = {
  id: 'id',
  propertyId: 'propertyId',
  proposalId: 'proposalId',
  orderId: 'orderId',
  transactionId: 'transactionId',
  paymentMethod: 'paymentMethod',
  amount: 'amount',
  currency: 'currency',
  status: 'status',
  signature: 'signature',
  description: 'description',
  paymentGatewayUrl: 'paymentGatewayUrl',
  paidAt: 'paidAt',
  createdAt: 'createdAt'
};

exports.Prisma.InstallationProgressScalarFieldEnum = {
  id: 'id',
  propertyId: 'propertyId',
  paymentConfirmed: 'paymentConfirmed',
  paymentConfirmedAt: 'paymentConfirmedAt',
  engineerAssigned: 'engineerAssigned',
  engineerName: 'engineerName',
  engineerPhone: 'engineerPhone',
  engineerAssignedAt: 'engineerAssignedAt',
  siteSurveyScheduled: 'siteSurveyScheduled',
  siteSurveyDate: 'siteSurveyDate',
  installationStarted: 'installationStarted',
  installationDate: 'installationDate',
  systemActivated: 'systemActivated',
  activationDate: 'activationDate',
  estimatedCompletion: 'estimatedCompletion',
  updatedAt: 'updatedAt'
};

exports.Prisma.EnergyStatScalarFieldEnum = {
  id: 'id',
  propertyId: 'propertyId',
  date: 'date',
  period: 'period',
  production: 'production',
  consumption: 'consumption',
  gridUsage: 'gridUsage',
  batteryPercent: 'batteryPercent',
  solarKw: 'solarKw',
  gridKw: 'gridKw',
  exporting: 'exporting'
};

exports.Prisma.NotificationScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  type: 'type',
  title: 'title',
  message: 'message',
  route: 'route',
  read: 'read',
  dismissible: 'dismissible',
  persistent: 'persistent',
  createdAt: 'createdAt'
};

exports.Prisma.AlertScalarFieldEnum = {
  id: 'id',
  propertyId: 'propertyId',
  category: 'category',
  severity: 'severity',
  title: 'title',
  message: 'message',
  read: 'read',
  createdAt: 'createdAt'
};

exports.Prisma.BillScalarFieldEnum = {
  id: 'id',
  propertyId: 'propertyId',
  month: 'month',
  totalAmount: 'totalAmount',
  subscriptionFee: 'subscriptionFee',
  usageCharge: 'usageCharge',
  taxes: 'taxes',
  status: 'status',
  dueDate: 'dueDate',
  generatedAt: 'generatedAt',
  paidDate: 'paidDate',
  pdfUrl: 'pdfUrl'
};

exports.Prisma.SupportTicketScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  propertyId: 'propertyId',
  category: 'category',
  priority: 'priority',
  status: 'status',
  title: 'title',
  description: 'description',
  estimatedResponse: 'estimatedResponse',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.AIMessageScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  propertyId: 'propertyId',
  role: 'role',
  content: 'content',
  createdAt: 'createdAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};
exports.Role = exports.$Enums.Role = {
  CITIZEN: 'CITIZEN',
  ADMIN: 'ADMIN',
  EXECUTIVE: 'EXECUTIVE'
};

exports.PropertyType = exports.$Enums.PropertyType = {
  residential: 'residential',
  commercial: 'commercial'
};

exports.SubscriptionStatus = exports.$Enums.SubscriptionStatus = {
  NONE: 'NONE',
  SURVEY_PENDING: 'SURVEY_PENDING',
  SURVEY_SUBMITTED: 'SURVEY_SUBMITTED',
  PLAN_PROPOSED: 'PLAN_PROPOSED',
  PAYMENT_PENDING: 'PAYMENT_PENDING',
  PENDING_INSTALLATION: 'PENDING_INSTALLATION',
  ACTIVE: 'ACTIVE'
};

exports.PaymentMethod = exports.$Enums.PaymentMethod = {
  UPI: 'UPI',
  Card: 'Card',
  NetBanking: 'NetBanking'
};

exports.PaymentStatus = exports.$Enums.PaymentStatus = {
  PENDING: 'PENDING',
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED'
};

exports.AlertCategory = exports.$Enums.AlertCategory = {
  consumption: 'consumption',
  production: 'production',
  battery: 'battery',
  grid: 'grid',
  system: 'system',
  maintenance: 'maintenance'
};

exports.AlertSeverity = exports.$Enums.AlertSeverity = {
  info: 'info',
  warning: 'warning',
  critical: 'critical'
};

exports.BillStatus = exports.$Enums.BillStatus = {
  pending: 'pending',
  paid: 'paid'
};

exports.TicketCategory = exports.$Enums.TicketCategory = {
  technical: 'technical',
  billing: 'billing',
  installation: 'installation',
  general: 'general'
};

exports.TicketPriority = exports.$Enums.TicketPriority = {
  low: 'low',
  medium: 'medium',
  high: 'high'
};

exports.TicketStatus = exports.$Enums.TicketStatus = {
  open: 'open',
  in_progress: 'in_progress',
  resolved: 'resolved',
  closed: 'closed'
};

exports.ChatRole = exports.$Enums.ChatRole = {
  user: 'user',
  assistant: 'assistant'
};

exports.Prisma.ModelName = {
  User: 'User',
  RefreshToken: 'RefreshToken',
  Property: 'Property',
  Survey: 'Survey',
  Proposal: 'Proposal',
  Payment: 'Payment',
  InstallationProgress: 'InstallationProgress',
  EnergyStat: 'EnergyStat',
  Notification: 'Notification',
  Alert: 'Alert',
  Bill: 'Bill',
  SupportTicket: 'SupportTicket',
  AIMessage: 'AIMessage'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
