
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model RefreshToken
 * 
 */
export type RefreshToken = $Result.DefaultSelection<Prisma.$RefreshTokenPayload>
/**
 * Model Property
 * 
 */
export type Property = $Result.DefaultSelection<Prisma.$PropertyPayload>
/**
 * Model Survey
 * 
 */
export type Survey = $Result.DefaultSelection<Prisma.$SurveyPayload>
/**
 * Model Proposal
 * 
 */
export type Proposal = $Result.DefaultSelection<Prisma.$ProposalPayload>
/**
 * Model Payment
 * 
 */
export type Payment = $Result.DefaultSelection<Prisma.$PaymentPayload>
/**
 * Model InstallationProgress
 * 
 */
export type InstallationProgress = $Result.DefaultSelection<Prisma.$InstallationProgressPayload>
/**
 * Model EnergyStat
 * 
 */
export type EnergyStat = $Result.DefaultSelection<Prisma.$EnergyStatPayload>
/**
 * Model Notification
 * 
 */
export type Notification = $Result.DefaultSelection<Prisma.$NotificationPayload>
/**
 * Model Alert
 * 
 */
export type Alert = $Result.DefaultSelection<Prisma.$AlertPayload>
/**
 * Model Bill
 * 
 */
export type Bill = $Result.DefaultSelection<Prisma.$BillPayload>
/**
 * Model SupportTicket
 * 
 */
export type SupportTicket = $Result.DefaultSelection<Prisma.$SupportTicketPayload>
/**
 * Model AIMessage
 * 
 */
export type AIMessage = $Result.DefaultSelection<Prisma.$AIMessagePayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  CITIZEN: 'CITIZEN',
  ADMIN: 'ADMIN',
  EXECUTIVE: 'EXECUTIVE'
};

export type Role = (typeof Role)[keyof typeof Role]


export const PropertyType: {
  residential: 'residential',
  commercial: 'commercial'
};

export type PropertyType = (typeof PropertyType)[keyof typeof PropertyType]


export const SubscriptionStatus: {
  NONE: 'NONE',
  SURVEY_PENDING: 'SURVEY_PENDING',
  SURVEY_SUBMITTED: 'SURVEY_SUBMITTED',
  PLAN_PROPOSED: 'PLAN_PROPOSED',
  PAYMENT_PENDING: 'PAYMENT_PENDING',
  PENDING_INSTALLATION: 'PENDING_INSTALLATION',
  ACTIVE: 'ACTIVE'
};

export type SubscriptionStatus = (typeof SubscriptionStatus)[keyof typeof SubscriptionStatus]


export const PaymentMethod: {
  UPI: 'UPI',
  Card: 'Card',
  NetBanking: 'NetBanking'
};

export type PaymentMethod = (typeof PaymentMethod)[keyof typeof PaymentMethod]


export const PaymentStatus: {
  PENDING: 'PENDING',
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED'
};

export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus]


export const AlertCategory: {
  consumption: 'consumption',
  production: 'production',
  battery: 'battery',
  grid: 'grid',
  system: 'system',
  maintenance: 'maintenance'
};

export type AlertCategory = (typeof AlertCategory)[keyof typeof AlertCategory]


export const AlertSeverity: {
  info: 'info',
  warning: 'warning',
  critical: 'critical'
};

export type AlertSeverity = (typeof AlertSeverity)[keyof typeof AlertSeverity]


export const BillStatus: {
  pending: 'pending',
  paid: 'paid'
};

export type BillStatus = (typeof BillStatus)[keyof typeof BillStatus]


export const TicketCategory: {
  technical: 'technical',
  billing: 'billing',
  installation: 'installation',
  general: 'general'
};

export type TicketCategory = (typeof TicketCategory)[keyof typeof TicketCategory]


export const TicketPriority: {
  low: 'low',
  medium: 'medium',
  high: 'high'
};

export type TicketPriority = (typeof TicketPriority)[keyof typeof TicketPriority]


export const TicketStatus: {
  open: 'open',
  in_progress: 'in_progress',
  resolved: 'resolved',
  closed: 'closed'
};

export type TicketStatus = (typeof TicketStatus)[keyof typeof TicketStatus]


export const ChatRole: {
  user: 'user',
  assistant: 'assistant'
};

export type ChatRole = (typeof ChatRole)[keyof typeof ChatRole]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type PropertyType = $Enums.PropertyType

export const PropertyType: typeof $Enums.PropertyType

export type SubscriptionStatus = $Enums.SubscriptionStatus

export const SubscriptionStatus: typeof $Enums.SubscriptionStatus

export type PaymentMethod = $Enums.PaymentMethod

export const PaymentMethod: typeof $Enums.PaymentMethod

export type PaymentStatus = $Enums.PaymentStatus

export const PaymentStatus: typeof $Enums.PaymentStatus

export type AlertCategory = $Enums.AlertCategory

export const AlertCategory: typeof $Enums.AlertCategory

export type AlertSeverity = $Enums.AlertSeverity

export const AlertSeverity: typeof $Enums.AlertSeverity

export type BillStatus = $Enums.BillStatus

export const BillStatus: typeof $Enums.BillStatus

export type TicketCategory = $Enums.TicketCategory

export const TicketCategory: typeof $Enums.TicketCategory

export type TicketPriority = $Enums.TicketPriority

export const TicketPriority: typeof $Enums.TicketPriority

export type TicketStatus = $Enums.TicketStatus

export const TicketStatus: typeof $Enums.TicketStatus

export type ChatRole = $Enums.ChatRole

export const ChatRole: typeof $Enums.ChatRole

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs>;

  /**
   * `prisma.refreshToken`: Exposes CRUD operations for the **RefreshToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RefreshTokens
    * const refreshTokens = await prisma.refreshToken.findMany()
    * ```
    */
  get refreshToken(): Prisma.RefreshTokenDelegate<ExtArgs>;

  /**
   * `prisma.property`: Exposes CRUD operations for the **Property** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Properties
    * const properties = await prisma.property.findMany()
    * ```
    */
  get property(): Prisma.PropertyDelegate<ExtArgs>;

  /**
   * `prisma.survey`: Exposes CRUD operations for the **Survey** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Surveys
    * const surveys = await prisma.survey.findMany()
    * ```
    */
  get survey(): Prisma.SurveyDelegate<ExtArgs>;

  /**
   * `prisma.proposal`: Exposes CRUD operations for the **Proposal** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Proposals
    * const proposals = await prisma.proposal.findMany()
    * ```
    */
  get proposal(): Prisma.ProposalDelegate<ExtArgs>;

  /**
   * `prisma.payment`: Exposes CRUD operations for the **Payment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Payments
    * const payments = await prisma.payment.findMany()
    * ```
    */
  get payment(): Prisma.PaymentDelegate<ExtArgs>;

  /**
   * `prisma.installationProgress`: Exposes CRUD operations for the **InstallationProgress** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more InstallationProgresses
    * const installationProgresses = await prisma.installationProgress.findMany()
    * ```
    */
  get installationProgress(): Prisma.InstallationProgressDelegate<ExtArgs>;

  /**
   * `prisma.energyStat`: Exposes CRUD operations for the **EnergyStat** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EnergyStats
    * const energyStats = await prisma.energyStat.findMany()
    * ```
    */
  get energyStat(): Prisma.EnergyStatDelegate<ExtArgs>;

  /**
   * `prisma.notification`: Exposes CRUD operations for the **Notification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Notifications
    * const notifications = await prisma.notification.findMany()
    * ```
    */
  get notification(): Prisma.NotificationDelegate<ExtArgs>;

  /**
   * `prisma.alert`: Exposes CRUD operations for the **Alert** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Alerts
    * const alerts = await prisma.alert.findMany()
    * ```
    */
  get alert(): Prisma.AlertDelegate<ExtArgs>;

  /**
   * `prisma.bill`: Exposes CRUD operations for the **Bill** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Bills
    * const bills = await prisma.bill.findMany()
    * ```
    */
  get bill(): Prisma.BillDelegate<ExtArgs>;

  /**
   * `prisma.supportTicket`: Exposes CRUD operations for the **SupportTicket** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SupportTickets
    * const supportTickets = await prisma.supportTicket.findMany()
    * ```
    */
  get supportTicket(): Prisma.SupportTicketDelegate<ExtArgs>;

  /**
   * `prisma.aIMessage`: Exposes CRUD operations for the **AIMessage** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AIMessages
    * const aIMessages = await prisma.aIMessage.findMany()
    * ```
    */
  get aIMessage(): Prisma.AIMessageDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
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

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "user" | "refreshToken" | "property" | "survey" | "proposal" | "payment" | "installationProgress" | "energyStat" | "notification" | "alert" | "bill" | "supportTicket" | "aIMessage"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      RefreshToken: {
        payload: Prisma.$RefreshTokenPayload<ExtArgs>
        fields: Prisma.RefreshTokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RefreshTokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RefreshTokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          findFirst: {
            args: Prisma.RefreshTokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RefreshTokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          findMany: {
            args: Prisma.RefreshTokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>[]
          }
          create: {
            args: Prisma.RefreshTokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          createMany: {
            args: Prisma.RefreshTokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RefreshTokenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>[]
          }
          delete: {
            args: Prisma.RefreshTokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          update: {
            args: Prisma.RefreshTokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          deleteMany: {
            args: Prisma.RefreshTokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RefreshTokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.RefreshTokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          aggregate: {
            args: Prisma.RefreshTokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRefreshToken>
          }
          groupBy: {
            args: Prisma.RefreshTokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<RefreshTokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.RefreshTokenCountArgs<ExtArgs>
            result: $Utils.Optional<RefreshTokenCountAggregateOutputType> | number
          }
        }
      }
      Property: {
        payload: Prisma.$PropertyPayload<ExtArgs>
        fields: Prisma.PropertyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PropertyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PropertyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyPayload>
          }
          findFirst: {
            args: Prisma.PropertyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PropertyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyPayload>
          }
          findMany: {
            args: Prisma.PropertyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyPayload>[]
          }
          create: {
            args: Prisma.PropertyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyPayload>
          }
          createMany: {
            args: Prisma.PropertyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PropertyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyPayload>[]
          }
          delete: {
            args: Prisma.PropertyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyPayload>
          }
          update: {
            args: Prisma.PropertyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyPayload>
          }
          deleteMany: {
            args: Prisma.PropertyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PropertyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PropertyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyPayload>
          }
          aggregate: {
            args: Prisma.PropertyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProperty>
          }
          groupBy: {
            args: Prisma.PropertyGroupByArgs<ExtArgs>
            result: $Utils.Optional<PropertyGroupByOutputType>[]
          }
          count: {
            args: Prisma.PropertyCountArgs<ExtArgs>
            result: $Utils.Optional<PropertyCountAggregateOutputType> | number
          }
        }
      }
      Survey: {
        payload: Prisma.$SurveyPayload<ExtArgs>
        fields: Prisma.SurveyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SurveyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SurveyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SurveyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SurveyPayload>
          }
          findFirst: {
            args: Prisma.SurveyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SurveyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SurveyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SurveyPayload>
          }
          findMany: {
            args: Prisma.SurveyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SurveyPayload>[]
          }
          create: {
            args: Prisma.SurveyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SurveyPayload>
          }
          createMany: {
            args: Prisma.SurveyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SurveyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SurveyPayload>[]
          }
          delete: {
            args: Prisma.SurveyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SurveyPayload>
          }
          update: {
            args: Prisma.SurveyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SurveyPayload>
          }
          deleteMany: {
            args: Prisma.SurveyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SurveyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SurveyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SurveyPayload>
          }
          aggregate: {
            args: Prisma.SurveyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSurvey>
          }
          groupBy: {
            args: Prisma.SurveyGroupByArgs<ExtArgs>
            result: $Utils.Optional<SurveyGroupByOutputType>[]
          }
          count: {
            args: Prisma.SurveyCountArgs<ExtArgs>
            result: $Utils.Optional<SurveyCountAggregateOutputType> | number
          }
        }
      }
      Proposal: {
        payload: Prisma.$ProposalPayload<ExtArgs>
        fields: Prisma.ProposalFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProposalFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProposalPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProposalFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProposalPayload>
          }
          findFirst: {
            args: Prisma.ProposalFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProposalPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProposalFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProposalPayload>
          }
          findMany: {
            args: Prisma.ProposalFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProposalPayload>[]
          }
          create: {
            args: Prisma.ProposalCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProposalPayload>
          }
          createMany: {
            args: Prisma.ProposalCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProposalCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProposalPayload>[]
          }
          delete: {
            args: Prisma.ProposalDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProposalPayload>
          }
          update: {
            args: Prisma.ProposalUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProposalPayload>
          }
          deleteMany: {
            args: Prisma.ProposalDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProposalUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ProposalUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProposalPayload>
          }
          aggregate: {
            args: Prisma.ProposalAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProposal>
          }
          groupBy: {
            args: Prisma.ProposalGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProposalGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProposalCountArgs<ExtArgs>
            result: $Utils.Optional<ProposalCountAggregateOutputType> | number
          }
        }
      }
      Payment: {
        payload: Prisma.$PaymentPayload<ExtArgs>
        fields: Prisma.PaymentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PaymentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PaymentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          findFirst: {
            args: Prisma.PaymentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PaymentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          findMany: {
            args: Prisma.PaymentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>[]
          }
          create: {
            args: Prisma.PaymentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          createMany: {
            args: Prisma.PaymentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PaymentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>[]
          }
          delete: {
            args: Prisma.PaymentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          update: {
            args: Prisma.PaymentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          deleteMany: {
            args: Prisma.PaymentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PaymentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PaymentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          aggregate: {
            args: Prisma.PaymentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePayment>
          }
          groupBy: {
            args: Prisma.PaymentGroupByArgs<ExtArgs>
            result: $Utils.Optional<PaymentGroupByOutputType>[]
          }
          count: {
            args: Prisma.PaymentCountArgs<ExtArgs>
            result: $Utils.Optional<PaymentCountAggregateOutputType> | number
          }
        }
      }
      InstallationProgress: {
        payload: Prisma.$InstallationProgressPayload<ExtArgs>
        fields: Prisma.InstallationProgressFieldRefs
        operations: {
          findUnique: {
            args: Prisma.InstallationProgressFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstallationProgressPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.InstallationProgressFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstallationProgressPayload>
          }
          findFirst: {
            args: Prisma.InstallationProgressFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstallationProgressPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.InstallationProgressFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstallationProgressPayload>
          }
          findMany: {
            args: Prisma.InstallationProgressFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstallationProgressPayload>[]
          }
          create: {
            args: Prisma.InstallationProgressCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstallationProgressPayload>
          }
          createMany: {
            args: Prisma.InstallationProgressCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.InstallationProgressCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstallationProgressPayload>[]
          }
          delete: {
            args: Prisma.InstallationProgressDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstallationProgressPayload>
          }
          update: {
            args: Prisma.InstallationProgressUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstallationProgressPayload>
          }
          deleteMany: {
            args: Prisma.InstallationProgressDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.InstallationProgressUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.InstallationProgressUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstallationProgressPayload>
          }
          aggregate: {
            args: Prisma.InstallationProgressAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateInstallationProgress>
          }
          groupBy: {
            args: Prisma.InstallationProgressGroupByArgs<ExtArgs>
            result: $Utils.Optional<InstallationProgressGroupByOutputType>[]
          }
          count: {
            args: Prisma.InstallationProgressCountArgs<ExtArgs>
            result: $Utils.Optional<InstallationProgressCountAggregateOutputType> | number
          }
        }
      }
      EnergyStat: {
        payload: Prisma.$EnergyStatPayload<ExtArgs>
        fields: Prisma.EnergyStatFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EnergyStatFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnergyStatPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EnergyStatFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnergyStatPayload>
          }
          findFirst: {
            args: Prisma.EnergyStatFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnergyStatPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EnergyStatFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnergyStatPayload>
          }
          findMany: {
            args: Prisma.EnergyStatFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnergyStatPayload>[]
          }
          create: {
            args: Prisma.EnergyStatCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnergyStatPayload>
          }
          createMany: {
            args: Prisma.EnergyStatCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EnergyStatCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnergyStatPayload>[]
          }
          delete: {
            args: Prisma.EnergyStatDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnergyStatPayload>
          }
          update: {
            args: Prisma.EnergyStatUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnergyStatPayload>
          }
          deleteMany: {
            args: Prisma.EnergyStatDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EnergyStatUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.EnergyStatUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnergyStatPayload>
          }
          aggregate: {
            args: Prisma.EnergyStatAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEnergyStat>
          }
          groupBy: {
            args: Prisma.EnergyStatGroupByArgs<ExtArgs>
            result: $Utils.Optional<EnergyStatGroupByOutputType>[]
          }
          count: {
            args: Prisma.EnergyStatCountArgs<ExtArgs>
            result: $Utils.Optional<EnergyStatCountAggregateOutputType> | number
          }
        }
      }
      Notification: {
        payload: Prisma.$NotificationPayload<ExtArgs>
        fields: Prisma.NotificationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NotificationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NotificationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          findFirst: {
            args: Prisma.NotificationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NotificationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          findMany: {
            args: Prisma.NotificationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          create: {
            args: Prisma.NotificationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          createMany: {
            args: Prisma.NotificationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NotificationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          delete: {
            args: Prisma.NotificationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          update: {
            args: Prisma.NotificationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          deleteMany: {
            args: Prisma.NotificationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NotificationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.NotificationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          aggregate: {
            args: Prisma.NotificationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNotification>
          }
          groupBy: {
            args: Prisma.NotificationGroupByArgs<ExtArgs>
            result: $Utils.Optional<NotificationGroupByOutputType>[]
          }
          count: {
            args: Prisma.NotificationCountArgs<ExtArgs>
            result: $Utils.Optional<NotificationCountAggregateOutputType> | number
          }
        }
      }
      Alert: {
        payload: Prisma.$AlertPayload<ExtArgs>
        fields: Prisma.AlertFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AlertFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AlertFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertPayload>
          }
          findFirst: {
            args: Prisma.AlertFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AlertFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertPayload>
          }
          findMany: {
            args: Prisma.AlertFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertPayload>[]
          }
          create: {
            args: Prisma.AlertCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertPayload>
          }
          createMany: {
            args: Prisma.AlertCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AlertCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertPayload>[]
          }
          delete: {
            args: Prisma.AlertDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertPayload>
          }
          update: {
            args: Prisma.AlertUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertPayload>
          }
          deleteMany: {
            args: Prisma.AlertDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AlertUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AlertUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertPayload>
          }
          aggregate: {
            args: Prisma.AlertAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAlert>
          }
          groupBy: {
            args: Prisma.AlertGroupByArgs<ExtArgs>
            result: $Utils.Optional<AlertGroupByOutputType>[]
          }
          count: {
            args: Prisma.AlertCountArgs<ExtArgs>
            result: $Utils.Optional<AlertCountAggregateOutputType> | number
          }
        }
      }
      Bill: {
        payload: Prisma.$BillPayload<ExtArgs>
        fields: Prisma.BillFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BillFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BillPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BillFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BillPayload>
          }
          findFirst: {
            args: Prisma.BillFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BillPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BillFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BillPayload>
          }
          findMany: {
            args: Prisma.BillFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BillPayload>[]
          }
          create: {
            args: Prisma.BillCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BillPayload>
          }
          createMany: {
            args: Prisma.BillCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BillCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BillPayload>[]
          }
          delete: {
            args: Prisma.BillDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BillPayload>
          }
          update: {
            args: Prisma.BillUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BillPayload>
          }
          deleteMany: {
            args: Prisma.BillDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BillUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.BillUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BillPayload>
          }
          aggregate: {
            args: Prisma.BillAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBill>
          }
          groupBy: {
            args: Prisma.BillGroupByArgs<ExtArgs>
            result: $Utils.Optional<BillGroupByOutputType>[]
          }
          count: {
            args: Prisma.BillCountArgs<ExtArgs>
            result: $Utils.Optional<BillCountAggregateOutputType> | number
          }
        }
      }
      SupportTicket: {
        payload: Prisma.$SupportTicketPayload<ExtArgs>
        fields: Prisma.SupportTicketFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SupportTicketFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportTicketPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SupportTicketFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportTicketPayload>
          }
          findFirst: {
            args: Prisma.SupportTicketFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportTicketPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SupportTicketFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportTicketPayload>
          }
          findMany: {
            args: Prisma.SupportTicketFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportTicketPayload>[]
          }
          create: {
            args: Prisma.SupportTicketCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportTicketPayload>
          }
          createMany: {
            args: Prisma.SupportTicketCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SupportTicketCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportTicketPayload>[]
          }
          delete: {
            args: Prisma.SupportTicketDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportTicketPayload>
          }
          update: {
            args: Prisma.SupportTicketUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportTicketPayload>
          }
          deleteMany: {
            args: Prisma.SupportTicketDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SupportTicketUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SupportTicketUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupportTicketPayload>
          }
          aggregate: {
            args: Prisma.SupportTicketAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSupportTicket>
          }
          groupBy: {
            args: Prisma.SupportTicketGroupByArgs<ExtArgs>
            result: $Utils.Optional<SupportTicketGroupByOutputType>[]
          }
          count: {
            args: Prisma.SupportTicketCountArgs<ExtArgs>
            result: $Utils.Optional<SupportTicketCountAggregateOutputType> | number
          }
        }
      }
      AIMessage: {
        payload: Prisma.$AIMessagePayload<ExtArgs>
        fields: Prisma.AIMessageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AIMessageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIMessagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AIMessageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIMessagePayload>
          }
          findFirst: {
            args: Prisma.AIMessageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIMessagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AIMessageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIMessagePayload>
          }
          findMany: {
            args: Prisma.AIMessageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIMessagePayload>[]
          }
          create: {
            args: Prisma.AIMessageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIMessagePayload>
          }
          createMany: {
            args: Prisma.AIMessageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AIMessageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIMessagePayload>[]
          }
          delete: {
            args: Prisma.AIMessageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIMessagePayload>
          }
          update: {
            args: Prisma.AIMessageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIMessagePayload>
          }
          deleteMany: {
            args: Prisma.AIMessageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AIMessageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AIMessageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AIMessagePayload>
          }
          aggregate: {
            args: Prisma.AIMessageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAIMessage>
          }
          groupBy: {
            args: Prisma.AIMessageGroupByArgs<ExtArgs>
            result: $Utils.Optional<AIMessageGroupByOutputType>[]
          }
          count: {
            args: Prisma.AIMessageCountArgs<ExtArgs>
            result: $Utils.Optional<AIMessageCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    refreshTokens: number
    properties: number
    notifications: number
    supportTickets: number
    aiMessages: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    refreshTokens?: boolean | UserCountOutputTypeCountRefreshTokensArgs
    properties?: boolean | UserCountOutputTypeCountPropertiesArgs
    notifications?: boolean | UserCountOutputTypeCountNotificationsArgs
    supportTickets?: boolean | UserCountOutputTypeCountSupportTicketsArgs
    aiMessages?: boolean | UserCountOutputTypeCountAiMessagesArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountRefreshTokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RefreshTokenWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPropertiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PropertyWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountNotificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSupportTicketsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SupportTicketWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAiMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AIMessageWhereInput
  }


  /**
   * Count Type PropertyCountOutputType
   */

  export type PropertyCountOutputType = {
    surveys: number
    proposals: number
    payments: number
    energyStats: number
    alerts: number
    bills: number
    supportTickets: number
    aiMessages: number
  }

  export type PropertyCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    surveys?: boolean | PropertyCountOutputTypeCountSurveysArgs
    proposals?: boolean | PropertyCountOutputTypeCountProposalsArgs
    payments?: boolean | PropertyCountOutputTypeCountPaymentsArgs
    energyStats?: boolean | PropertyCountOutputTypeCountEnergyStatsArgs
    alerts?: boolean | PropertyCountOutputTypeCountAlertsArgs
    bills?: boolean | PropertyCountOutputTypeCountBillsArgs
    supportTickets?: boolean | PropertyCountOutputTypeCountSupportTicketsArgs
    aiMessages?: boolean | PropertyCountOutputTypeCountAiMessagesArgs
  }

  // Custom InputTypes
  /**
   * PropertyCountOutputType without action
   */
  export type PropertyCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyCountOutputType
     */
    select?: PropertyCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PropertyCountOutputType without action
   */
  export type PropertyCountOutputTypeCountSurveysArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SurveyWhereInput
  }

  /**
   * PropertyCountOutputType without action
   */
  export type PropertyCountOutputTypeCountProposalsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProposalWhereInput
  }

  /**
   * PropertyCountOutputType without action
   */
  export type PropertyCountOutputTypeCountPaymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentWhereInput
  }

  /**
   * PropertyCountOutputType without action
   */
  export type PropertyCountOutputTypeCountEnergyStatsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EnergyStatWhereInput
  }

  /**
   * PropertyCountOutputType without action
   */
  export type PropertyCountOutputTypeCountAlertsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AlertWhereInput
  }

  /**
   * PropertyCountOutputType without action
   */
  export type PropertyCountOutputTypeCountBillsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BillWhereInput
  }

  /**
   * PropertyCountOutputType without action
   */
  export type PropertyCountOutputTypeCountSupportTicketsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SupportTicketWhereInput
  }

  /**
   * PropertyCountOutputType without action
   */
  export type PropertyCountOutputTypeCountAiMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AIMessageWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    name: string | null
    phone: string | null
    address: string | null
    role: $Enums.Role | null
    isActive: boolean | null
    currentPropertyId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    name: string | null
    phone: string | null
    address: string | null
    role: $Enums.Role | null
    isActive: boolean | null
    currentPropertyId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    password: number
    name: number
    phone: number
    address: number
    role: number
    isActive: number
    currentPropertyId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    phone?: true
    address?: true
    role?: true
    isActive?: true
    currentPropertyId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    phone?: true
    address?: true
    role?: true
    isActive?: true
    currentPropertyId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    phone?: true
    address?: true
    role?: true
    isActive?: true
    currentPropertyId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    password: string
    name: string
    phone: string | null
    address: string | null
    role: $Enums.Role
    isActive: boolean
    currentPropertyId: string | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    phone?: boolean
    address?: boolean
    role?: boolean
    isActive?: boolean
    currentPropertyId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    refreshTokens?: boolean | User$refreshTokensArgs<ExtArgs>
    properties?: boolean | User$propertiesArgs<ExtArgs>
    notifications?: boolean | User$notificationsArgs<ExtArgs>
    supportTickets?: boolean | User$supportTicketsArgs<ExtArgs>
    aiMessages?: boolean | User$aiMessagesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    phone?: boolean
    address?: boolean
    role?: boolean
    isActive?: boolean
    currentPropertyId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    phone?: boolean
    address?: boolean
    role?: boolean
    isActive?: boolean
    currentPropertyId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    refreshTokens?: boolean | User$refreshTokensArgs<ExtArgs>
    properties?: boolean | User$propertiesArgs<ExtArgs>
    notifications?: boolean | User$notificationsArgs<ExtArgs>
    supportTickets?: boolean | User$supportTicketsArgs<ExtArgs>
    aiMessages?: boolean | User$aiMessagesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      refreshTokens: Prisma.$RefreshTokenPayload<ExtArgs>[]
      properties: Prisma.$PropertyPayload<ExtArgs>[]
      notifications: Prisma.$NotificationPayload<ExtArgs>[]
      supportTickets: Prisma.$SupportTicketPayload<ExtArgs>[]
      aiMessages: Prisma.$AIMessagePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      password: string
      name: string
      phone: string | null
      address: string | null
      role: $Enums.Role
      isActive: boolean
      currentPropertyId: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    refreshTokens<T extends User$refreshTokensArgs<ExtArgs> = {}>(args?: Subset<T, User$refreshTokensArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findMany"> | Null>
    properties<T extends User$propertiesArgs<ExtArgs> = {}>(args?: Subset<T, User$propertiesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "findMany"> | Null>
    notifications<T extends User$notificationsArgs<ExtArgs> = {}>(args?: Subset<T, User$notificationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany"> | Null>
    supportTickets<T extends User$supportTicketsArgs<ExtArgs> = {}>(args?: Subset<T, User$supportTicketsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SupportTicketPayload<ExtArgs>, T, "findMany"> | Null>
    aiMessages<T extends User$aiMessagesArgs<ExtArgs> = {}>(args?: Subset<T, User$aiMessagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIMessagePayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */ 
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly phone: FieldRef<"User", 'String'>
    readonly address: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'Role'>
    readonly isActive: FieldRef<"User", 'Boolean'>
    readonly currentPropertyId: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }

  /**
   * User.refreshTokens
   */
  export type User$refreshTokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    where?: RefreshTokenWhereInput
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    cursor?: RefreshTokenWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RefreshTokenScalarFieldEnum | RefreshTokenScalarFieldEnum[]
  }

  /**
   * User.properties
   */
  export type User$propertiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyInclude<ExtArgs> | null
    where?: PropertyWhereInput
    orderBy?: PropertyOrderByWithRelationInput | PropertyOrderByWithRelationInput[]
    cursor?: PropertyWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PropertyScalarFieldEnum | PropertyScalarFieldEnum[]
  }

  /**
   * User.notifications
   */
  export type User$notificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    where?: NotificationWhereInput
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    cursor?: NotificationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * User.supportTickets
   */
  export type User$supportTicketsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportTicket
     */
    select?: SupportTicketSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportTicketInclude<ExtArgs> | null
    where?: SupportTicketWhereInput
    orderBy?: SupportTicketOrderByWithRelationInput | SupportTicketOrderByWithRelationInput[]
    cursor?: SupportTicketWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SupportTicketScalarFieldEnum | SupportTicketScalarFieldEnum[]
  }

  /**
   * User.aiMessages
   */
  export type User$aiMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIMessage
     */
    select?: AIMessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIMessageInclude<ExtArgs> | null
    where?: AIMessageWhereInput
    orderBy?: AIMessageOrderByWithRelationInput | AIMessageOrderByWithRelationInput[]
    cursor?: AIMessageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AIMessageScalarFieldEnum | AIMessageScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model RefreshToken
   */

  export type AggregateRefreshToken = {
    _count: RefreshTokenCountAggregateOutputType | null
    _min: RefreshTokenMinAggregateOutputType | null
    _max: RefreshTokenMaxAggregateOutputType | null
  }

  export type RefreshTokenMinAggregateOutputType = {
    id: string | null
    token: string | null
    userId: string | null
    expiresAt: Date | null
    createdAt: Date | null
    isRevoked: boolean | null
  }

  export type RefreshTokenMaxAggregateOutputType = {
    id: string | null
    token: string | null
    userId: string | null
    expiresAt: Date | null
    createdAt: Date | null
    isRevoked: boolean | null
  }

  export type RefreshTokenCountAggregateOutputType = {
    id: number
    token: number
    userId: number
    expiresAt: number
    createdAt: number
    isRevoked: number
    _all: number
  }


  export type RefreshTokenMinAggregateInputType = {
    id?: true
    token?: true
    userId?: true
    expiresAt?: true
    createdAt?: true
    isRevoked?: true
  }

  export type RefreshTokenMaxAggregateInputType = {
    id?: true
    token?: true
    userId?: true
    expiresAt?: true
    createdAt?: true
    isRevoked?: true
  }

  export type RefreshTokenCountAggregateInputType = {
    id?: true
    token?: true
    userId?: true
    expiresAt?: true
    createdAt?: true
    isRevoked?: true
    _all?: true
  }

  export type RefreshTokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RefreshToken to aggregate.
     */
    where?: RefreshTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RefreshTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefreshTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RefreshTokens
    **/
    _count?: true | RefreshTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RefreshTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RefreshTokenMaxAggregateInputType
  }

  export type GetRefreshTokenAggregateType<T extends RefreshTokenAggregateArgs> = {
        [P in keyof T & keyof AggregateRefreshToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRefreshToken[P]>
      : GetScalarType<T[P], AggregateRefreshToken[P]>
  }




  export type RefreshTokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RefreshTokenWhereInput
    orderBy?: RefreshTokenOrderByWithAggregationInput | RefreshTokenOrderByWithAggregationInput[]
    by: RefreshTokenScalarFieldEnum[] | RefreshTokenScalarFieldEnum
    having?: RefreshTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RefreshTokenCountAggregateInputType | true
    _min?: RefreshTokenMinAggregateInputType
    _max?: RefreshTokenMaxAggregateInputType
  }

  export type RefreshTokenGroupByOutputType = {
    id: string
    token: string
    userId: string
    expiresAt: Date
    createdAt: Date
    isRevoked: boolean
    _count: RefreshTokenCountAggregateOutputType | null
    _min: RefreshTokenMinAggregateOutputType | null
    _max: RefreshTokenMaxAggregateOutputType | null
  }

  type GetRefreshTokenGroupByPayload<T extends RefreshTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RefreshTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RefreshTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RefreshTokenGroupByOutputType[P]>
            : GetScalarType<T[P], RefreshTokenGroupByOutputType[P]>
        }
      >
    >


  export type RefreshTokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    token?: boolean
    userId?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    isRevoked?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["refreshToken"]>

  export type RefreshTokenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    token?: boolean
    userId?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    isRevoked?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["refreshToken"]>

  export type RefreshTokenSelectScalar = {
    id?: boolean
    token?: boolean
    userId?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    isRevoked?: boolean
  }

  export type RefreshTokenInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type RefreshTokenIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $RefreshTokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RefreshToken"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      token: string
      userId: string
      expiresAt: Date
      createdAt: Date
      isRevoked: boolean
    }, ExtArgs["result"]["refreshToken"]>
    composites: {}
  }

  type RefreshTokenGetPayload<S extends boolean | null | undefined | RefreshTokenDefaultArgs> = $Result.GetResult<Prisma.$RefreshTokenPayload, S>

  type RefreshTokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<RefreshTokenFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: RefreshTokenCountAggregateInputType | true
    }

  export interface RefreshTokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RefreshToken'], meta: { name: 'RefreshToken' } }
    /**
     * Find zero or one RefreshToken that matches the filter.
     * @param {RefreshTokenFindUniqueArgs} args - Arguments to find a RefreshToken
     * @example
     * // Get one RefreshToken
     * const refreshToken = await prisma.refreshToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RefreshTokenFindUniqueArgs>(args: SelectSubset<T, RefreshTokenFindUniqueArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one RefreshToken that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {RefreshTokenFindUniqueOrThrowArgs} args - Arguments to find a RefreshToken
     * @example
     * // Get one RefreshToken
     * const refreshToken = await prisma.refreshToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RefreshTokenFindUniqueOrThrowArgs>(args: SelectSubset<T, RefreshTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first RefreshToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenFindFirstArgs} args - Arguments to find a RefreshToken
     * @example
     * // Get one RefreshToken
     * const refreshToken = await prisma.refreshToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RefreshTokenFindFirstArgs>(args?: SelectSubset<T, RefreshTokenFindFirstArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first RefreshToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenFindFirstOrThrowArgs} args - Arguments to find a RefreshToken
     * @example
     * // Get one RefreshToken
     * const refreshToken = await prisma.refreshToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RefreshTokenFindFirstOrThrowArgs>(args?: SelectSubset<T, RefreshTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more RefreshTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RefreshTokens
     * const refreshTokens = await prisma.refreshToken.findMany()
     * 
     * // Get first 10 RefreshTokens
     * const refreshTokens = await prisma.refreshToken.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const refreshTokenWithIdOnly = await prisma.refreshToken.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RefreshTokenFindManyArgs>(args?: SelectSubset<T, RefreshTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a RefreshToken.
     * @param {RefreshTokenCreateArgs} args - Arguments to create a RefreshToken.
     * @example
     * // Create one RefreshToken
     * const RefreshToken = await prisma.refreshToken.create({
     *   data: {
     *     // ... data to create a RefreshToken
     *   }
     * })
     * 
     */
    create<T extends RefreshTokenCreateArgs>(args: SelectSubset<T, RefreshTokenCreateArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many RefreshTokens.
     * @param {RefreshTokenCreateManyArgs} args - Arguments to create many RefreshTokens.
     * @example
     * // Create many RefreshTokens
     * const refreshToken = await prisma.refreshToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RefreshTokenCreateManyArgs>(args?: SelectSubset<T, RefreshTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RefreshTokens and returns the data saved in the database.
     * @param {RefreshTokenCreateManyAndReturnArgs} args - Arguments to create many RefreshTokens.
     * @example
     * // Create many RefreshTokens
     * const refreshToken = await prisma.refreshToken.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RefreshTokens and only return the `id`
     * const refreshTokenWithIdOnly = await prisma.refreshToken.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RefreshTokenCreateManyAndReturnArgs>(args?: SelectSubset<T, RefreshTokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a RefreshToken.
     * @param {RefreshTokenDeleteArgs} args - Arguments to delete one RefreshToken.
     * @example
     * // Delete one RefreshToken
     * const RefreshToken = await prisma.refreshToken.delete({
     *   where: {
     *     // ... filter to delete one RefreshToken
     *   }
     * })
     * 
     */
    delete<T extends RefreshTokenDeleteArgs>(args: SelectSubset<T, RefreshTokenDeleteArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one RefreshToken.
     * @param {RefreshTokenUpdateArgs} args - Arguments to update one RefreshToken.
     * @example
     * // Update one RefreshToken
     * const refreshToken = await prisma.refreshToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RefreshTokenUpdateArgs>(args: SelectSubset<T, RefreshTokenUpdateArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more RefreshTokens.
     * @param {RefreshTokenDeleteManyArgs} args - Arguments to filter RefreshTokens to delete.
     * @example
     * // Delete a few RefreshTokens
     * const { count } = await prisma.refreshToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RefreshTokenDeleteManyArgs>(args?: SelectSubset<T, RefreshTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RefreshTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RefreshTokens
     * const refreshToken = await prisma.refreshToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RefreshTokenUpdateManyArgs>(args: SelectSubset<T, RefreshTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one RefreshToken.
     * @param {RefreshTokenUpsertArgs} args - Arguments to update or create a RefreshToken.
     * @example
     * // Update or create a RefreshToken
     * const refreshToken = await prisma.refreshToken.upsert({
     *   create: {
     *     // ... data to create a RefreshToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RefreshToken we want to update
     *   }
     * })
     */
    upsert<T extends RefreshTokenUpsertArgs>(args: SelectSubset<T, RefreshTokenUpsertArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of RefreshTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenCountArgs} args - Arguments to filter RefreshTokens to count.
     * @example
     * // Count the number of RefreshTokens
     * const count = await prisma.refreshToken.count({
     *   where: {
     *     // ... the filter for the RefreshTokens we want to count
     *   }
     * })
    **/
    count<T extends RefreshTokenCountArgs>(
      args?: Subset<T, RefreshTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RefreshTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RefreshToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RefreshTokenAggregateArgs>(args: Subset<T, RefreshTokenAggregateArgs>): Prisma.PrismaPromise<GetRefreshTokenAggregateType<T>>

    /**
     * Group by RefreshToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RefreshTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RefreshTokenGroupByArgs['orderBy'] }
        : { orderBy?: RefreshTokenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RefreshTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRefreshTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RefreshToken model
   */
  readonly fields: RefreshTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RefreshToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RefreshTokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RefreshToken model
   */ 
  interface RefreshTokenFieldRefs {
    readonly id: FieldRef<"RefreshToken", 'String'>
    readonly token: FieldRef<"RefreshToken", 'String'>
    readonly userId: FieldRef<"RefreshToken", 'String'>
    readonly expiresAt: FieldRef<"RefreshToken", 'DateTime'>
    readonly createdAt: FieldRef<"RefreshToken", 'DateTime'>
    readonly isRevoked: FieldRef<"RefreshToken", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * RefreshToken findUnique
   */
  export type RefreshTokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshToken to fetch.
     */
    where: RefreshTokenWhereUniqueInput
  }

  /**
   * RefreshToken findUniqueOrThrow
   */
  export type RefreshTokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshToken to fetch.
     */
    where: RefreshTokenWhereUniqueInput
  }

  /**
   * RefreshToken findFirst
   */
  export type RefreshTokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshToken to fetch.
     */
    where?: RefreshTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RefreshTokens.
     */
    cursor?: RefreshTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefreshTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RefreshTokens.
     */
    distinct?: RefreshTokenScalarFieldEnum | RefreshTokenScalarFieldEnum[]
  }

  /**
   * RefreshToken findFirstOrThrow
   */
  export type RefreshTokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshToken to fetch.
     */
    where?: RefreshTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RefreshTokens.
     */
    cursor?: RefreshTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefreshTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RefreshTokens.
     */
    distinct?: RefreshTokenScalarFieldEnum | RefreshTokenScalarFieldEnum[]
  }

  /**
   * RefreshToken findMany
   */
  export type RefreshTokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshTokens to fetch.
     */
    where?: RefreshTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RefreshTokens.
     */
    cursor?: RefreshTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefreshTokens.
     */
    skip?: number
    distinct?: RefreshTokenScalarFieldEnum | RefreshTokenScalarFieldEnum[]
  }

  /**
   * RefreshToken create
   */
  export type RefreshTokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * The data needed to create a RefreshToken.
     */
    data: XOR<RefreshTokenCreateInput, RefreshTokenUncheckedCreateInput>
  }

  /**
   * RefreshToken createMany
   */
  export type RefreshTokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RefreshTokens.
     */
    data: RefreshTokenCreateManyInput | RefreshTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RefreshToken createManyAndReturn
   */
  export type RefreshTokenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many RefreshTokens.
     */
    data: RefreshTokenCreateManyInput | RefreshTokenCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RefreshToken update
   */
  export type RefreshTokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * The data needed to update a RefreshToken.
     */
    data: XOR<RefreshTokenUpdateInput, RefreshTokenUncheckedUpdateInput>
    /**
     * Choose, which RefreshToken to update.
     */
    where: RefreshTokenWhereUniqueInput
  }

  /**
   * RefreshToken updateMany
   */
  export type RefreshTokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RefreshTokens.
     */
    data: XOR<RefreshTokenUpdateManyMutationInput, RefreshTokenUncheckedUpdateManyInput>
    /**
     * Filter which RefreshTokens to update
     */
    where?: RefreshTokenWhereInput
  }

  /**
   * RefreshToken upsert
   */
  export type RefreshTokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * The filter to search for the RefreshToken to update in case it exists.
     */
    where: RefreshTokenWhereUniqueInput
    /**
     * In case the RefreshToken found by the `where` argument doesn't exist, create a new RefreshToken with this data.
     */
    create: XOR<RefreshTokenCreateInput, RefreshTokenUncheckedCreateInput>
    /**
     * In case the RefreshToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RefreshTokenUpdateInput, RefreshTokenUncheckedUpdateInput>
  }

  /**
   * RefreshToken delete
   */
  export type RefreshTokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter which RefreshToken to delete.
     */
    where: RefreshTokenWhereUniqueInput
  }

  /**
   * RefreshToken deleteMany
   */
  export type RefreshTokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RefreshTokens to delete
     */
    where?: RefreshTokenWhereInput
  }

  /**
   * RefreshToken without action
   */
  export type RefreshTokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
  }


  /**
   * Model Property
   */

  export type AggregateProperty = {
    _count: PropertyCountAggregateOutputType | null
    _avg: PropertyAvgAggregateOutputType | null
    _sum: PropertySumAggregateOutputType | null
    _min: PropertyMinAggregateOutputType | null
    _max: PropertyMaxAggregateOutputType | null
  }

  export type PropertyAvgAggregateOutputType = {
    solarCapacity: number | null
    batteryStorage: number | null
  }

  export type PropertySumAggregateOutputType = {
    solarCapacity: number | null
    batteryStorage: number | null
  }

  export type PropertyMinAggregateOutputType = {
    id: string | null
    userId: string | null
    name: string | null
    address: string | null
    type: $Enums.PropertyType | null
    subscriptionStatus: $Enums.SubscriptionStatus | null
    planType: string | null
    solarCapacity: number | null
    batteryStorage: number | null
    installationDate: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PropertyMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    name: string | null
    address: string | null
    type: $Enums.PropertyType | null
    subscriptionStatus: $Enums.SubscriptionStatus | null
    planType: string | null
    solarCapacity: number | null
    batteryStorage: number | null
    installationDate: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PropertyCountAggregateOutputType = {
    id: number
    userId: number
    name: number
    address: number
    type: number
    subscriptionStatus: number
    planType: number
    solarCapacity: number
    batteryStorage: number
    installationDate: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PropertyAvgAggregateInputType = {
    solarCapacity?: true
    batteryStorage?: true
  }

  export type PropertySumAggregateInputType = {
    solarCapacity?: true
    batteryStorage?: true
  }

  export type PropertyMinAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    address?: true
    type?: true
    subscriptionStatus?: true
    planType?: true
    solarCapacity?: true
    batteryStorage?: true
    installationDate?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PropertyMaxAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    address?: true
    type?: true
    subscriptionStatus?: true
    planType?: true
    solarCapacity?: true
    batteryStorage?: true
    installationDate?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PropertyCountAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    address?: true
    type?: true
    subscriptionStatus?: true
    planType?: true
    solarCapacity?: true
    batteryStorage?: true
    installationDate?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PropertyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Property to aggregate.
     */
    where?: PropertyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Properties to fetch.
     */
    orderBy?: PropertyOrderByWithRelationInput | PropertyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PropertyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Properties from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Properties.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Properties
    **/
    _count?: true | PropertyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PropertyAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PropertySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PropertyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PropertyMaxAggregateInputType
  }

  export type GetPropertyAggregateType<T extends PropertyAggregateArgs> = {
        [P in keyof T & keyof AggregateProperty]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProperty[P]>
      : GetScalarType<T[P], AggregateProperty[P]>
  }




  export type PropertyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PropertyWhereInput
    orderBy?: PropertyOrderByWithAggregationInput | PropertyOrderByWithAggregationInput[]
    by: PropertyScalarFieldEnum[] | PropertyScalarFieldEnum
    having?: PropertyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PropertyCountAggregateInputType | true
    _avg?: PropertyAvgAggregateInputType
    _sum?: PropertySumAggregateInputType
    _min?: PropertyMinAggregateInputType
    _max?: PropertyMaxAggregateInputType
  }

  export type PropertyGroupByOutputType = {
    id: string
    userId: string
    name: string
    address: string
    type: $Enums.PropertyType
    subscriptionStatus: $Enums.SubscriptionStatus
    planType: string | null
    solarCapacity: number | null
    batteryStorage: number | null
    installationDate: Date | null
    createdAt: Date
    updatedAt: Date
    _count: PropertyCountAggregateOutputType | null
    _avg: PropertyAvgAggregateOutputType | null
    _sum: PropertySumAggregateOutputType | null
    _min: PropertyMinAggregateOutputType | null
    _max: PropertyMaxAggregateOutputType | null
  }

  type GetPropertyGroupByPayload<T extends PropertyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PropertyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PropertyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PropertyGroupByOutputType[P]>
            : GetScalarType<T[P], PropertyGroupByOutputType[P]>
        }
      >
    >


  export type PropertySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    address?: boolean
    type?: boolean
    subscriptionStatus?: boolean
    planType?: boolean
    solarCapacity?: boolean
    batteryStorage?: boolean
    installationDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    surveys?: boolean | Property$surveysArgs<ExtArgs>
    proposals?: boolean | Property$proposalsArgs<ExtArgs>
    payments?: boolean | Property$paymentsArgs<ExtArgs>
    installation?: boolean | Property$installationArgs<ExtArgs>
    energyStats?: boolean | Property$energyStatsArgs<ExtArgs>
    alerts?: boolean | Property$alertsArgs<ExtArgs>
    bills?: boolean | Property$billsArgs<ExtArgs>
    supportTickets?: boolean | Property$supportTicketsArgs<ExtArgs>
    aiMessages?: boolean | Property$aiMessagesArgs<ExtArgs>
    _count?: boolean | PropertyCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["property"]>

  export type PropertySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    address?: boolean
    type?: boolean
    subscriptionStatus?: boolean
    planType?: boolean
    solarCapacity?: boolean
    batteryStorage?: boolean
    installationDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["property"]>

  export type PropertySelectScalar = {
    id?: boolean
    userId?: boolean
    name?: boolean
    address?: boolean
    type?: boolean
    subscriptionStatus?: boolean
    planType?: boolean
    solarCapacity?: boolean
    batteryStorage?: boolean
    installationDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PropertyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    surveys?: boolean | Property$surveysArgs<ExtArgs>
    proposals?: boolean | Property$proposalsArgs<ExtArgs>
    payments?: boolean | Property$paymentsArgs<ExtArgs>
    installation?: boolean | Property$installationArgs<ExtArgs>
    energyStats?: boolean | Property$energyStatsArgs<ExtArgs>
    alerts?: boolean | Property$alertsArgs<ExtArgs>
    bills?: boolean | Property$billsArgs<ExtArgs>
    supportTickets?: boolean | Property$supportTicketsArgs<ExtArgs>
    aiMessages?: boolean | Property$aiMessagesArgs<ExtArgs>
    _count?: boolean | PropertyCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PropertyIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $PropertyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Property"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      surveys: Prisma.$SurveyPayload<ExtArgs>[]
      proposals: Prisma.$ProposalPayload<ExtArgs>[]
      payments: Prisma.$PaymentPayload<ExtArgs>[]
      installation: Prisma.$InstallationProgressPayload<ExtArgs> | null
      energyStats: Prisma.$EnergyStatPayload<ExtArgs>[]
      alerts: Prisma.$AlertPayload<ExtArgs>[]
      bills: Prisma.$BillPayload<ExtArgs>[]
      supportTickets: Prisma.$SupportTicketPayload<ExtArgs>[]
      aiMessages: Prisma.$AIMessagePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      name: string
      address: string
      type: $Enums.PropertyType
      subscriptionStatus: $Enums.SubscriptionStatus
      planType: string | null
      solarCapacity: number | null
      batteryStorage: number | null
      installationDate: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["property"]>
    composites: {}
  }

  type PropertyGetPayload<S extends boolean | null | undefined | PropertyDefaultArgs> = $Result.GetResult<Prisma.$PropertyPayload, S>

  type PropertyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PropertyFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PropertyCountAggregateInputType | true
    }

  export interface PropertyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Property'], meta: { name: 'Property' } }
    /**
     * Find zero or one Property that matches the filter.
     * @param {PropertyFindUniqueArgs} args - Arguments to find a Property
     * @example
     * // Get one Property
     * const property = await prisma.property.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PropertyFindUniqueArgs>(args: SelectSubset<T, PropertyFindUniqueArgs<ExtArgs>>): Prisma__PropertyClient<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Property that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PropertyFindUniqueOrThrowArgs} args - Arguments to find a Property
     * @example
     * // Get one Property
     * const property = await prisma.property.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PropertyFindUniqueOrThrowArgs>(args: SelectSubset<T, PropertyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PropertyClient<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Property that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyFindFirstArgs} args - Arguments to find a Property
     * @example
     * // Get one Property
     * const property = await prisma.property.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PropertyFindFirstArgs>(args?: SelectSubset<T, PropertyFindFirstArgs<ExtArgs>>): Prisma__PropertyClient<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Property that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyFindFirstOrThrowArgs} args - Arguments to find a Property
     * @example
     * // Get one Property
     * const property = await prisma.property.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PropertyFindFirstOrThrowArgs>(args?: SelectSubset<T, PropertyFindFirstOrThrowArgs<ExtArgs>>): Prisma__PropertyClient<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Properties that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Properties
     * const properties = await prisma.property.findMany()
     * 
     * // Get first 10 Properties
     * const properties = await prisma.property.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const propertyWithIdOnly = await prisma.property.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PropertyFindManyArgs>(args?: SelectSubset<T, PropertyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Property.
     * @param {PropertyCreateArgs} args - Arguments to create a Property.
     * @example
     * // Create one Property
     * const Property = await prisma.property.create({
     *   data: {
     *     // ... data to create a Property
     *   }
     * })
     * 
     */
    create<T extends PropertyCreateArgs>(args: SelectSubset<T, PropertyCreateArgs<ExtArgs>>): Prisma__PropertyClient<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Properties.
     * @param {PropertyCreateManyArgs} args - Arguments to create many Properties.
     * @example
     * // Create many Properties
     * const property = await prisma.property.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PropertyCreateManyArgs>(args?: SelectSubset<T, PropertyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Properties and returns the data saved in the database.
     * @param {PropertyCreateManyAndReturnArgs} args - Arguments to create many Properties.
     * @example
     * // Create many Properties
     * const property = await prisma.property.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Properties and only return the `id`
     * const propertyWithIdOnly = await prisma.property.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PropertyCreateManyAndReturnArgs>(args?: SelectSubset<T, PropertyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Property.
     * @param {PropertyDeleteArgs} args - Arguments to delete one Property.
     * @example
     * // Delete one Property
     * const Property = await prisma.property.delete({
     *   where: {
     *     // ... filter to delete one Property
     *   }
     * })
     * 
     */
    delete<T extends PropertyDeleteArgs>(args: SelectSubset<T, PropertyDeleteArgs<ExtArgs>>): Prisma__PropertyClient<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Property.
     * @param {PropertyUpdateArgs} args - Arguments to update one Property.
     * @example
     * // Update one Property
     * const property = await prisma.property.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PropertyUpdateArgs>(args: SelectSubset<T, PropertyUpdateArgs<ExtArgs>>): Prisma__PropertyClient<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Properties.
     * @param {PropertyDeleteManyArgs} args - Arguments to filter Properties to delete.
     * @example
     * // Delete a few Properties
     * const { count } = await prisma.property.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PropertyDeleteManyArgs>(args?: SelectSubset<T, PropertyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Properties.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Properties
     * const property = await prisma.property.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PropertyUpdateManyArgs>(args: SelectSubset<T, PropertyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Property.
     * @param {PropertyUpsertArgs} args - Arguments to update or create a Property.
     * @example
     * // Update or create a Property
     * const property = await prisma.property.upsert({
     *   create: {
     *     // ... data to create a Property
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Property we want to update
     *   }
     * })
     */
    upsert<T extends PropertyUpsertArgs>(args: SelectSubset<T, PropertyUpsertArgs<ExtArgs>>): Prisma__PropertyClient<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Properties.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyCountArgs} args - Arguments to filter Properties to count.
     * @example
     * // Count the number of Properties
     * const count = await prisma.property.count({
     *   where: {
     *     // ... the filter for the Properties we want to count
     *   }
     * })
    **/
    count<T extends PropertyCountArgs>(
      args?: Subset<T, PropertyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PropertyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Property.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PropertyAggregateArgs>(args: Subset<T, PropertyAggregateArgs>): Prisma.PrismaPromise<GetPropertyAggregateType<T>>

    /**
     * Group by Property.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PropertyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PropertyGroupByArgs['orderBy'] }
        : { orderBy?: PropertyGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PropertyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPropertyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Property model
   */
  readonly fields: PropertyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Property.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PropertyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    surveys<T extends Property$surveysArgs<ExtArgs> = {}>(args?: Subset<T, Property$surveysArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SurveyPayload<ExtArgs>, T, "findMany"> | Null>
    proposals<T extends Property$proposalsArgs<ExtArgs> = {}>(args?: Subset<T, Property$proposalsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProposalPayload<ExtArgs>, T, "findMany"> | Null>
    payments<T extends Property$paymentsArgs<ExtArgs> = {}>(args?: Subset<T, Property$paymentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findMany"> | Null>
    installation<T extends Property$installationArgs<ExtArgs> = {}>(args?: Subset<T, Property$installationArgs<ExtArgs>>): Prisma__InstallationProgressClient<$Result.GetResult<Prisma.$InstallationProgressPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    energyStats<T extends Property$energyStatsArgs<ExtArgs> = {}>(args?: Subset<T, Property$energyStatsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EnergyStatPayload<ExtArgs>, T, "findMany"> | Null>
    alerts<T extends Property$alertsArgs<ExtArgs> = {}>(args?: Subset<T, Property$alertsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AlertPayload<ExtArgs>, T, "findMany"> | Null>
    bills<T extends Property$billsArgs<ExtArgs> = {}>(args?: Subset<T, Property$billsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BillPayload<ExtArgs>, T, "findMany"> | Null>
    supportTickets<T extends Property$supportTicketsArgs<ExtArgs> = {}>(args?: Subset<T, Property$supportTicketsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SupportTicketPayload<ExtArgs>, T, "findMany"> | Null>
    aiMessages<T extends Property$aiMessagesArgs<ExtArgs> = {}>(args?: Subset<T, Property$aiMessagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIMessagePayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Property model
   */ 
  interface PropertyFieldRefs {
    readonly id: FieldRef<"Property", 'String'>
    readonly userId: FieldRef<"Property", 'String'>
    readonly name: FieldRef<"Property", 'String'>
    readonly address: FieldRef<"Property", 'String'>
    readonly type: FieldRef<"Property", 'PropertyType'>
    readonly subscriptionStatus: FieldRef<"Property", 'SubscriptionStatus'>
    readonly planType: FieldRef<"Property", 'String'>
    readonly solarCapacity: FieldRef<"Property", 'Float'>
    readonly batteryStorage: FieldRef<"Property", 'Float'>
    readonly installationDate: FieldRef<"Property", 'DateTime'>
    readonly createdAt: FieldRef<"Property", 'DateTime'>
    readonly updatedAt: FieldRef<"Property", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Property findUnique
   */
  export type PropertyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyInclude<ExtArgs> | null
    /**
     * Filter, which Property to fetch.
     */
    where: PropertyWhereUniqueInput
  }

  /**
   * Property findUniqueOrThrow
   */
  export type PropertyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyInclude<ExtArgs> | null
    /**
     * Filter, which Property to fetch.
     */
    where: PropertyWhereUniqueInput
  }

  /**
   * Property findFirst
   */
  export type PropertyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyInclude<ExtArgs> | null
    /**
     * Filter, which Property to fetch.
     */
    where?: PropertyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Properties to fetch.
     */
    orderBy?: PropertyOrderByWithRelationInput | PropertyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Properties.
     */
    cursor?: PropertyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Properties from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Properties.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Properties.
     */
    distinct?: PropertyScalarFieldEnum | PropertyScalarFieldEnum[]
  }

  /**
   * Property findFirstOrThrow
   */
  export type PropertyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyInclude<ExtArgs> | null
    /**
     * Filter, which Property to fetch.
     */
    where?: PropertyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Properties to fetch.
     */
    orderBy?: PropertyOrderByWithRelationInput | PropertyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Properties.
     */
    cursor?: PropertyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Properties from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Properties.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Properties.
     */
    distinct?: PropertyScalarFieldEnum | PropertyScalarFieldEnum[]
  }

  /**
   * Property findMany
   */
  export type PropertyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyInclude<ExtArgs> | null
    /**
     * Filter, which Properties to fetch.
     */
    where?: PropertyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Properties to fetch.
     */
    orderBy?: PropertyOrderByWithRelationInput | PropertyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Properties.
     */
    cursor?: PropertyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Properties from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Properties.
     */
    skip?: number
    distinct?: PropertyScalarFieldEnum | PropertyScalarFieldEnum[]
  }

  /**
   * Property create
   */
  export type PropertyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyInclude<ExtArgs> | null
    /**
     * The data needed to create a Property.
     */
    data: XOR<PropertyCreateInput, PropertyUncheckedCreateInput>
  }

  /**
   * Property createMany
   */
  export type PropertyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Properties.
     */
    data: PropertyCreateManyInput | PropertyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Property createManyAndReturn
   */
  export type PropertyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Properties.
     */
    data: PropertyCreateManyInput | PropertyCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Property update
   */
  export type PropertyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyInclude<ExtArgs> | null
    /**
     * The data needed to update a Property.
     */
    data: XOR<PropertyUpdateInput, PropertyUncheckedUpdateInput>
    /**
     * Choose, which Property to update.
     */
    where: PropertyWhereUniqueInput
  }

  /**
   * Property updateMany
   */
  export type PropertyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Properties.
     */
    data: XOR<PropertyUpdateManyMutationInput, PropertyUncheckedUpdateManyInput>
    /**
     * Filter which Properties to update
     */
    where?: PropertyWhereInput
  }

  /**
   * Property upsert
   */
  export type PropertyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyInclude<ExtArgs> | null
    /**
     * The filter to search for the Property to update in case it exists.
     */
    where: PropertyWhereUniqueInput
    /**
     * In case the Property found by the `where` argument doesn't exist, create a new Property with this data.
     */
    create: XOR<PropertyCreateInput, PropertyUncheckedCreateInput>
    /**
     * In case the Property was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PropertyUpdateInput, PropertyUncheckedUpdateInput>
  }

  /**
   * Property delete
   */
  export type PropertyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyInclude<ExtArgs> | null
    /**
     * Filter which Property to delete.
     */
    where: PropertyWhereUniqueInput
  }

  /**
   * Property deleteMany
   */
  export type PropertyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Properties to delete
     */
    where?: PropertyWhereInput
  }

  /**
   * Property.surveys
   */
  export type Property$surveysArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Survey
     */
    select?: SurveySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SurveyInclude<ExtArgs> | null
    where?: SurveyWhereInput
    orderBy?: SurveyOrderByWithRelationInput | SurveyOrderByWithRelationInput[]
    cursor?: SurveyWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SurveyScalarFieldEnum | SurveyScalarFieldEnum[]
  }

  /**
   * Property.proposals
   */
  export type Property$proposalsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Proposal
     */
    select?: ProposalSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProposalInclude<ExtArgs> | null
    where?: ProposalWhereInput
    orderBy?: ProposalOrderByWithRelationInput | ProposalOrderByWithRelationInput[]
    cursor?: ProposalWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProposalScalarFieldEnum | ProposalScalarFieldEnum[]
  }

  /**
   * Property.payments
   */
  export type Property$paymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    where?: PaymentWhereInput
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    cursor?: PaymentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Property.installation
   */
  export type Property$installationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InstallationProgress
     */
    select?: InstallationProgressSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstallationProgressInclude<ExtArgs> | null
    where?: InstallationProgressWhereInput
  }

  /**
   * Property.energyStats
   */
  export type Property$energyStatsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EnergyStat
     */
    select?: EnergyStatSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnergyStatInclude<ExtArgs> | null
    where?: EnergyStatWhereInput
    orderBy?: EnergyStatOrderByWithRelationInput | EnergyStatOrderByWithRelationInput[]
    cursor?: EnergyStatWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EnergyStatScalarFieldEnum | EnergyStatScalarFieldEnum[]
  }

  /**
   * Property.alerts
   */
  export type Property$alertsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alert
     */
    select?: AlertSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlertInclude<ExtArgs> | null
    where?: AlertWhereInput
    orderBy?: AlertOrderByWithRelationInput | AlertOrderByWithRelationInput[]
    cursor?: AlertWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AlertScalarFieldEnum | AlertScalarFieldEnum[]
  }

  /**
   * Property.bills
   */
  export type Property$billsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bill
     */
    select?: BillSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillInclude<ExtArgs> | null
    where?: BillWhereInput
    orderBy?: BillOrderByWithRelationInput | BillOrderByWithRelationInput[]
    cursor?: BillWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BillScalarFieldEnum | BillScalarFieldEnum[]
  }

  /**
   * Property.supportTickets
   */
  export type Property$supportTicketsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportTicket
     */
    select?: SupportTicketSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportTicketInclude<ExtArgs> | null
    where?: SupportTicketWhereInput
    orderBy?: SupportTicketOrderByWithRelationInput | SupportTicketOrderByWithRelationInput[]
    cursor?: SupportTicketWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SupportTicketScalarFieldEnum | SupportTicketScalarFieldEnum[]
  }

  /**
   * Property.aiMessages
   */
  export type Property$aiMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIMessage
     */
    select?: AIMessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIMessageInclude<ExtArgs> | null
    where?: AIMessageWhereInput
    orderBy?: AIMessageOrderByWithRelationInput | AIMessageOrderByWithRelationInput[]
    cursor?: AIMessageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AIMessageScalarFieldEnum | AIMessageScalarFieldEnum[]
  }

  /**
   * Property without action
   */
  export type PropertyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyInclude<ExtArgs> | null
  }


  /**
   * Model Survey
   */

  export type AggregateSurvey = {
    _count: SurveyCountAggregateOutputType | null
    _avg: SurveyAvgAggregateOutputType | null
    _sum: SurveySumAggregateOutputType | null
    _min: SurveyMinAggregateOutputType | null
    _max: SurveyMaxAggregateOutputType | null
  }

  export type SurveyAvgAggregateOutputType = {
    roofArea: number | null
    monthlyBill: number | null
    monthlyConsumption: number | null
    occupants: number | null
  }

  export type SurveySumAggregateOutputType = {
    roofArea: number | null
    monthlyBill: number | null
    monthlyConsumption: number | null
    occupants: number | null
  }

  export type SurveyMinAggregateOutputType = {
    id: string | null
    propertyId: string | null
    propertyType: $Enums.PropertyType | null
    roofArea: number | null
    monthlyBill: number | null
    monthlyConsumption: number | null
    peakHours: string | null
    occupants: number | null
    status: string | null
    submittedAt: Date | null
  }

  export type SurveyMaxAggregateOutputType = {
    id: string | null
    propertyId: string | null
    propertyType: $Enums.PropertyType | null
    roofArea: number | null
    monthlyBill: number | null
    monthlyConsumption: number | null
    peakHours: string | null
    occupants: number | null
    status: string | null
    submittedAt: Date | null
  }

  export type SurveyCountAggregateOutputType = {
    id: number
    propertyId: number
    propertyType: number
    roofArea: number
    monthlyBill: number
    monthlyConsumption: number
    peakHours: number
    occupants: number
    appliances: number
    status: number
    submittedAt: number
    _all: number
  }


  export type SurveyAvgAggregateInputType = {
    roofArea?: true
    monthlyBill?: true
    monthlyConsumption?: true
    occupants?: true
  }

  export type SurveySumAggregateInputType = {
    roofArea?: true
    monthlyBill?: true
    monthlyConsumption?: true
    occupants?: true
  }

  export type SurveyMinAggregateInputType = {
    id?: true
    propertyId?: true
    propertyType?: true
    roofArea?: true
    monthlyBill?: true
    monthlyConsumption?: true
    peakHours?: true
    occupants?: true
    status?: true
    submittedAt?: true
  }

  export type SurveyMaxAggregateInputType = {
    id?: true
    propertyId?: true
    propertyType?: true
    roofArea?: true
    monthlyBill?: true
    monthlyConsumption?: true
    peakHours?: true
    occupants?: true
    status?: true
    submittedAt?: true
  }

  export type SurveyCountAggregateInputType = {
    id?: true
    propertyId?: true
    propertyType?: true
    roofArea?: true
    monthlyBill?: true
    monthlyConsumption?: true
    peakHours?: true
    occupants?: true
    appliances?: true
    status?: true
    submittedAt?: true
    _all?: true
  }

  export type SurveyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Survey to aggregate.
     */
    where?: SurveyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Surveys to fetch.
     */
    orderBy?: SurveyOrderByWithRelationInput | SurveyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SurveyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Surveys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Surveys.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Surveys
    **/
    _count?: true | SurveyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SurveyAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SurveySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SurveyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SurveyMaxAggregateInputType
  }

  export type GetSurveyAggregateType<T extends SurveyAggregateArgs> = {
        [P in keyof T & keyof AggregateSurvey]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSurvey[P]>
      : GetScalarType<T[P], AggregateSurvey[P]>
  }




  export type SurveyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SurveyWhereInput
    orderBy?: SurveyOrderByWithAggregationInput | SurveyOrderByWithAggregationInput[]
    by: SurveyScalarFieldEnum[] | SurveyScalarFieldEnum
    having?: SurveyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SurveyCountAggregateInputType | true
    _avg?: SurveyAvgAggregateInputType
    _sum?: SurveySumAggregateInputType
    _min?: SurveyMinAggregateInputType
    _max?: SurveyMaxAggregateInputType
  }

  export type SurveyGroupByOutputType = {
    id: string
    propertyId: string
    propertyType: $Enums.PropertyType
    roofArea: number
    monthlyBill: number
    monthlyConsumption: number
    peakHours: string
    occupants: number
    appliances: string[]
    status: string
    submittedAt: Date
    _count: SurveyCountAggregateOutputType | null
    _avg: SurveyAvgAggregateOutputType | null
    _sum: SurveySumAggregateOutputType | null
    _min: SurveyMinAggregateOutputType | null
    _max: SurveyMaxAggregateOutputType | null
  }

  type GetSurveyGroupByPayload<T extends SurveyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SurveyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SurveyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SurveyGroupByOutputType[P]>
            : GetScalarType<T[P], SurveyGroupByOutputType[P]>
        }
      >
    >


  export type SurveySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    propertyId?: boolean
    propertyType?: boolean
    roofArea?: boolean
    monthlyBill?: boolean
    monthlyConsumption?: boolean
    peakHours?: boolean
    occupants?: boolean
    appliances?: boolean
    status?: boolean
    submittedAt?: boolean
    property?: boolean | PropertyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["survey"]>

  export type SurveySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    propertyId?: boolean
    propertyType?: boolean
    roofArea?: boolean
    monthlyBill?: boolean
    monthlyConsumption?: boolean
    peakHours?: boolean
    occupants?: boolean
    appliances?: boolean
    status?: boolean
    submittedAt?: boolean
    property?: boolean | PropertyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["survey"]>

  export type SurveySelectScalar = {
    id?: boolean
    propertyId?: boolean
    propertyType?: boolean
    roofArea?: boolean
    monthlyBill?: boolean
    monthlyConsumption?: boolean
    peakHours?: boolean
    occupants?: boolean
    appliances?: boolean
    status?: boolean
    submittedAt?: boolean
  }

  export type SurveyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    property?: boolean | PropertyDefaultArgs<ExtArgs>
  }
  export type SurveyIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    property?: boolean | PropertyDefaultArgs<ExtArgs>
  }

  export type $SurveyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Survey"
    objects: {
      property: Prisma.$PropertyPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      propertyId: string
      propertyType: $Enums.PropertyType
      roofArea: number
      monthlyBill: number
      monthlyConsumption: number
      peakHours: string
      occupants: number
      appliances: string[]
      status: string
      submittedAt: Date
    }, ExtArgs["result"]["survey"]>
    composites: {}
  }

  type SurveyGetPayload<S extends boolean | null | undefined | SurveyDefaultArgs> = $Result.GetResult<Prisma.$SurveyPayload, S>

  type SurveyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SurveyFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SurveyCountAggregateInputType | true
    }

  export interface SurveyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Survey'], meta: { name: 'Survey' } }
    /**
     * Find zero or one Survey that matches the filter.
     * @param {SurveyFindUniqueArgs} args - Arguments to find a Survey
     * @example
     * // Get one Survey
     * const survey = await prisma.survey.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SurveyFindUniqueArgs>(args: SelectSubset<T, SurveyFindUniqueArgs<ExtArgs>>): Prisma__SurveyClient<$Result.GetResult<Prisma.$SurveyPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Survey that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {SurveyFindUniqueOrThrowArgs} args - Arguments to find a Survey
     * @example
     * // Get one Survey
     * const survey = await prisma.survey.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SurveyFindUniqueOrThrowArgs>(args: SelectSubset<T, SurveyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SurveyClient<$Result.GetResult<Prisma.$SurveyPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Survey that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SurveyFindFirstArgs} args - Arguments to find a Survey
     * @example
     * // Get one Survey
     * const survey = await prisma.survey.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SurveyFindFirstArgs>(args?: SelectSubset<T, SurveyFindFirstArgs<ExtArgs>>): Prisma__SurveyClient<$Result.GetResult<Prisma.$SurveyPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Survey that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SurveyFindFirstOrThrowArgs} args - Arguments to find a Survey
     * @example
     * // Get one Survey
     * const survey = await prisma.survey.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SurveyFindFirstOrThrowArgs>(args?: SelectSubset<T, SurveyFindFirstOrThrowArgs<ExtArgs>>): Prisma__SurveyClient<$Result.GetResult<Prisma.$SurveyPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Surveys that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SurveyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Surveys
     * const surveys = await prisma.survey.findMany()
     * 
     * // Get first 10 Surveys
     * const surveys = await prisma.survey.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const surveyWithIdOnly = await prisma.survey.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SurveyFindManyArgs>(args?: SelectSubset<T, SurveyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SurveyPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Survey.
     * @param {SurveyCreateArgs} args - Arguments to create a Survey.
     * @example
     * // Create one Survey
     * const Survey = await prisma.survey.create({
     *   data: {
     *     // ... data to create a Survey
     *   }
     * })
     * 
     */
    create<T extends SurveyCreateArgs>(args: SelectSubset<T, SurveyCreateArgs<ExtArgs>>): Prisma__SurveyClient<$Result.GetResult<Prisma.$SurveyPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Surveys.
     * @param {SurveyCreateManyArgs} args - Arguments to create many Surveys.
     * @example
     * // Create many Surveys
     * const survey = await prisma.survey.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SurveyCreateManyArgs>(args?: SelectSubset<T, SurveyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Surveys and returns the data saved in the database.
     * @param {SurveyCreateManyAndReturnArgs} args - Arguments to create many Surveys.
     * @example
     * // Create many Surveys
     * const survey = await prisma.survey.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Surveys and only return the `id`
     * const surveyWithIdOnly = await prisma.survey.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SurveyCreateManyAndReturnArgs>(args?: SelectSubset<T, SurveyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SurveyPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Survey.
     * @param {SurveyDeleteArgs} args - Arguments to delete one Survey.
     * @example
     * // Delete one Survey
     * const Survey = await prisma.survey.delete({
     *   where: {
     *     // ... filter to delete one Survey
     *   }
     * })
     * 
     */
    delete<T extends SurveyDeleteArgs>(args: SelectSubset<T, SurveyDeleteArgs<ExtArgs>>): Prisma__SurveyClient<$Result.GetResult<Prisma.$SurveyPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Survey.
     * @param {SurveyUpdateArgs} args - Arguments to update one Survey.
     * @example
     * // Update one Survey
     * const survey = await prisma.survey.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SurveyUpdateArgs>(args: SelectSubset<T, SurveyUpdateArgs<ExtArgs>>): Prisma__SurveyClient<$Result.GetResult<Prisma.$SurveyPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Surveys.
     * @param {SurveyDeleteManyArgs} args - Arguments to filter Surveys to delete.
     * @example
     * // Delete a few Surveys
     * const { count } = await prisma.survey.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SurveyDeleteManyArgs>(args?: SelectSubset<T, SurveyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Surveys.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SurveyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Surveys
     * const survey = await prisma.survey.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SurveyUpdateManyArgs>(args: SelectSubset<T, SurveyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Survey.
     * @param {SurveyUpsertArgs} args - Arguments to update or create a Survey.
     * @example
     * // Update or create a Survey
     * const survey = await prisma.survey.upsert({
     *   create: {
     *     // ... data to create a Survey
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Survey we want to update
     *   }
     * })
     */
    upsert<T extends SurveyUpsertArgs>(args: SelectSubset<T, SurveyUpsertArgs<ExtArgs>>): Prisma__SurveyClient<$Result.GetResult<Prisma.$SurveyPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Surveys.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SurveyCountArgs} args - Arguments to filter Surveys to count.
     * @example
     * // Count the number of Surveys
     * const count = await prisma.survey.count({
     *   where: {
     *     // ... the filter for the Surveys we want to count
     *   }
     * })
    **/
    count<T extends SurveyCountArgs>(
      args?: Subset<T, SurveyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SurveyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Survey.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SurveyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SurveyAggregateArgs>(args: Subset<T, SurveyAggregateArgs>): Prisma.PrismaPromise<GetSurveyAggregateType<T>>

    /**
     * Group by Survey.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SurveyGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SurveyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SurveyGroupByArgs['orderBy'] }
        : { orderBy?: SurveyGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SurveyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSurveyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Survey model
   */
  readonly fields: SurveyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Survey.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SurveyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    property<T extends PropertyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PropertyDefaultArgs<ExtArgs>>): Prisma__PropertyClient<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Survey model
   */ 
  interface SurveyFieldRefs {
    readonly id: FieldRef<"Survey", 'String'>
    readonly propertyId: FieldRef<"Survey", 'String'>
    readonly propertyType: FieldRef<"Survey", 'PropertyType'>
    readonly roofArea: FieldRef<"Survey", 'Float'>
    readonly monthlyBill: FieldRef<"Survey", 'Float'>
    readonly monthlyConsumption: FieldRef<"Survey", 'Float'>
    readonly peakHours: FieldRef<"Survey", 'String'>
    readonly occupants: FieldRef<"Survey", 'Int'>
    readonly appliances: FieldRef<"Survey", 'String[]'>
    readonly status: FieldRef<"Survey", 'String'>
    readonly submittedAt: FieldRef<"Survey", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Survey findUnique
   */
  export type SurveyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Survey
     */
    select?: SurveySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SurveyInclude<ExtArgs> | null
    /**
     * Filter, which Survey to fetch.
     */
    where: SurveyWhereUniqueInput
  }

  /**
   * Survey findUniqueOrThrow
   */
  export type SurveyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Survey
     */
    select?: SurveySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SurveyInclude<ExtArgs> | null
    /**
     * Filter, which Survey to fetch.
     */
    where: SurveyWhereUniqueInput
  }

  /**
   * Survey findFirst
   */
  export type SurveyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Survey
     */
    select?: SurveySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SurveyInclude<ExtArgs> | null
    /**
     * Filter, which Survey to fetch.
     */
    where?: SurveyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Surveys to fetch.
     */
    orderBy?: SurveyOrderByWithRelationInput | SurveyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Surveys.
     */
    cursor?: SurveyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Surveys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Surveys.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Surveys.
     */
    distinct?: SurveyScalarFieldEnum | SurveyScalarFieldEnum[]
  }

  /**
   * Survey findFirstOrThrow
   */
  export type SurveyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Survey
     */
    select?: SurveySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SurveyInclude<ExtArgs> | null
    /**
     * Filter, which Survey to fetch.
     */
    where?: SurveyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Surveys to fetch.
     */
    orderBy?: SurveyOrderByWithRelationInput | SurveyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Surveys.
     */
    cursor?: SurveyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Surveys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Surveys.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Surveys.
     */
    distinct?: SurveyScalarFieldEnum | SurveyScalarFieldEnum[]
  }

  /**
   * Survey findMany
   */
  export type SurveyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Survey
     */
    select?: SurveySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SurveyInclude<ExtArgs> | null
    /**
     * Filter, which Surveys to fetch.
     */
    where?: SurveyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Surveys to fetch.
     */
    orderBy?: SurveyOrderByWithRelationInput | SurveyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Surveys.
     */
    cursor?: SurveyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Surveys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Surveys.
     */
    skip?: number
    distinct?: SurveyScalarFieldEnum | SurveyScalarFieldEnum[]
  }

  /**
   * Survey create
   */
  export type SurveyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Survey
     */
    select?: SurveySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SurveyInclude<ExtArgs> | null
    /**
     * The data needed to create a Survey.
     */
    data: XOR<SurveyCreateInput, SurveyUncheckedCreateInput>
  }

  /**
   * Survey createMany
   */
  export type SurveyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Surveys.
     */
    data: SurveyCreateManyInput | SurveyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Survey createManyAndReturn
   */
  export type SurveyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Survey
     */
    select?: SurveySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Surveys.
     */
    data: SurveyCreateManyInput | SurveyCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SurveyIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Survey update
   */
  export type SurveyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Survey
     */
    select?: SurveySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SurveyInclude<ExtArgs> | null
    /**
     * The data needed to update a Survey.
     */
    data: XOR<SurveyUpdateInput, SurveyUncheckedUpdateInput>
    /**
     * Choose, which Survey to update.
     */
    where: SurveyWhereUniqueInput
  }

  /**
   * Survey updateMany
   */
  export type SurveyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Surveys.
     */
    data: XOR<SurveyUpdateManyMutationInput, SurveyUncheckedUpdateManyInput>
    /**
     * Filter which Surveys to update
     */
    where?: SurveyWhereInput
  }

  /**
   * Survey upsert
   */
  export type SurveyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Survey
     */
    select?: SurveySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SurveyInclude<ExtArgs> | null
    /**
     * The filter to search for the Survey to update in case it exists.
     */
    where: SurveyWhereUniqueInput
    /**
     * In case the Survey found by the `where` argument doesn't exist, create a new Survey with this data.
     */
    create: XOR<SurveyCreateInput, SurveyUncheckedCreateInput>
    /**
     * In case the Survey was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SurveyUpdateInput, SurveyUncheckedUpdateInput>
  }

  /**
   * Survey delete
   */
  export type SurveyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Survey
     */
    select?: SurveySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SurveyInclude<ExtArgs> | null
    /**
     * Filter which Survey to delete.
     */
    where: SurveyWhereUniqueInput
  }

  /**
   * Survey deleteMany
   */
  export type SurveyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Surveys to delete
     */
    where?: SurveyWhereInput
  }

  /**
   * Survey without action
   */
  export type SurveyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Survey
     */
    select?: SurveySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SurveyInclude<ExtArgs> | null
  }


  /**
   * Model Proposal
   */

  export type AggregateProposal = {
    _count: ProposalCountAggregateOutputType | null
    _avg: ProposalAvgAggregateOutputType | null
    _sum: ProposalSumAggregateOutputType | null
    _min: ProposalMinAggregateOutputType | null
    _max: ProposalMaxAggregateOutputType | null
  }

  export type ProposalAvgAggregateOutputType = {
    solarCapacity: number | null
    batteryStorage: number | null
    monthlyFee: number | null
    estimatedSavings: number | null
    estimatedProduction: number | null
    contractDuration: number | null
    installationFee: number | null
    securityDeposit: number | null
  }

  export type ProposalSumAggregateOutputType = {
    solarCapacity: number | null
    batteryStorage: number | null
    monthlyFee: number | null
    estimatedSavings: number | null
    estimatedProduction: number | null
    contractDuration: number | null
    installationFee: number | null
    securityDeposit: number | null
  }

  export type ProposalMinAggregateOutputType = {
    id: string | null
    propertyId: string | null
    surveyId: string | null
    solarCapacity: number | null
    batteryStorage: number | null
    monthlyFee: number | null
    estimatedSavings: number | null
    estimatedProduction: number | null
    contractDuration: number | null
    installationFee: number | null
    securityDeposit: number | null
    generatedAt: Date | null
    expiresAt: Date | null
  }

  export type ProposalMaxAggregateOutputType = {
    id: string | null
    propertyId: string | null
    surveyId: string | null
    solarCapacity: number | null
    batteryStorage: number | null
    monthlyFee: number | null
    estimatedSavings: number | null
    estimatedProduction: number | null
    contractDuration: number | null
    installationFee: number | null
    securityDeposit: number | null
    generatedAt: Date | null
    expiresAt: Date | null
  }

  export type ProposalCountAggregateOutputType = {
    id: number
    propertyId: number
    surveyId: number
    solarCapacity: number
    batteryStorage: number
    monthlyFee: number
    estimatedSavings: number
    estimatedProduction: number
    contractDuration: number
    installationFee: number
    securityDeposit: number
    whatsIncluded: number
    generatedAt: number
    expiresAt: number
    _all: number
  }


  export type ProposalAvgAggregateInputType = {
    solarCapacity?: true
    batteryStorage?: true
    monthlyFee?: true
    estimatedSavings?: true
    estimatedProduction?: true
    contractDuration?: true
    installationFee?: true
    securityDeposit?: true
  }

  export type ProposalSumAggregateInputType = {
    solarCapacity?: true
    batteryStorage?: true
    monthlyFee?: true
    estimatedSavings?: true
    estimatedProduction?: true
    contractDuration?: true
    installationFee?: true
    securityDeposit?: true
  }

  export type ProposalMinAggregateInputType = {
    id?: true
    propertyId?: true
    surveyId?: true
    solarCapacity?: true
    batteryStorage?: true
    monthlyFee?: true
    estimatedSavings?: true
    estimatedProduction?: true
    contractDuration?: true
    installationFee?: true
    securityDeposit?: true
    generatedAt?: true
    expiresAt?: true
  }

  export type ProposalMaxAggregateInputType = {
    id?: true
    propertyId?: true
    surveyId?: true
    solarCapacity?: true
    batteryStorage?: true
    monthlyFee?: true
    estimatedSavings?: true
    estimatedProduction?: true
    contractDuration?: true
    installationFee?: true
    securityDeposit?: true
    generatedAt?: true
    expiresAt?: true
  }

  export type ProposalCountAggregateInputType = {
    id?: true
    propertyId?: true
    surveyId?: true
    solarCapacity?: true
    batteryStorage?: true
    monthlyFee?: true
    estimatedSavings?: true
    estimatedProduction?: true
    contractDuration?: true
    installationFee?: true
    securityDeposit?: true
    whatsIncluded?: true
    generatedAt?: true
    expiresAt?: true
    _all?: true
  }

  export type ProposalAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Proposal to aggregate.
     */
    where?: ProposalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Proposals to fetch.
     */
    orderBy?: ProposalOrderByWithRelationInput | ProposalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProposalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Proposals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Proposals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Proposals
    **/
    _count?: true | ProposalCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProposalAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProposalSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProposalMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProposalMaxAggregateInputType
  }

  export type GetProposalAggregateType<T extends ProposalAggregateArgs> = {
        [P in keyof T & keyof AggregateProposal]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProposal[P]>
      : GetScalarType<T[P], AggregateProposal[P]>
  }




  export type ProposalGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProposalWhereInput
    orderBy?: ProposalOrderByWithAggregationInput | ProposalOrderByWithAggregationInput[]
    by: ProposalScalarFieldEnum[] | ProposalScalarFieldEnum
    having?: ProposalScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProposalCountAggregateInputType | true
    _avg?: ProposalAvgAggregateInputType
    _sum?: ProposalSumAggregateInputType
    _min?: ProposalMinAggregateInputType
    _max?: ProposalMaxAggregateInputType
  }

  export type ProposalGroupByOutputType = {
    id: string
    propertyId: string
    surveyId: string
    solarCapacity: number
    batteryStorage: number
    monthlyFee: number
    estimatedSavings: number
    estimatedProduction: number
    contractDuration: number
    installationFee: number
    securityDeposit: number
    whatsIncluded: string[]
    generatedAt: Date
    expiresAt: Date
    _count: ProposalCountAggregateOutputType | null
    _avg: ProposalAvgAggregateOutputType | null
    _sum: ProposalSumAggregateOutputType | null
    _min: ProposalMinAggregateOutputType | null
    _max: ProposalMaxAggregateOutputType | null
  }

  type GetProposalGroupByPayload<T extends ProposalGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProposalGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProposalGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProposalGroupByOutputType[P]>
            : GetScalarType<T[P], ProposalGroupByOutputType[P]>
        }
      >
    >


  export type ProposalSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    propertyId?: boolean
    surveyId?: boolean
    solarCapacity?: boolean
    batteryStorage?: boolean
    monthlyFee?: boolean
    estimatedSavings?: boolean
    estimatedProduction?: boolean
    contractDuration?: boolean
    installationFee?: boolean
    securityDeposit?: boolean
    whatsIncluded?: boolean
    generatedAt?: boolean
    expiresAt?: boolean
    property?: boolean | PropertyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["proposal"]>

  export type ProposalSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    propertyId?: boolean
    surveyId?: boolean
    solarCapacity?: boolean
    batteryStorage?: boolean
    monthlyFee?: boolean
    estimatedSavings?: boolean
    estimatedProduction?: boolean
    contractDuration?: boolean
    installationFee?: boolean
    securityDeposit?: boolean
    whatsIncluded?: boolean
    generatedAt?: boolean
    expiresAt?: boolean
    property?: boolean | PropertyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["proposal"]>

  export type ProposalSelectScalar = {
    id?: boolean
    propertyId?: boolean
    surveyId?: boolean
    solarCapacity?: boolean
    batteryStorage?: boolean
    monthlyFee?: boolean
    estimatedSavings?: boolean
    estimatedProduction?: boolean
    contractDuration?: boolean
    installationFee?: boolean
    securityDeposit?: boolean
    whatsIncluded?: boolean
    generatedAt?: boolean
    expiresAt?: boolean
  }

  export type ProposalInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    property?: boolean | PropertyDefaultArgs<ExtArgs>
  }
  export type ProposalIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    property?: boolean | PropertyDefaultArgs<ExtArgs>
  }

  export type $ProposalPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Proposal"
    objects: {
      property: Prisma.$PropertyPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      propertyId: string
      surveyId: string
      solarCapacity: number
      batteryStorage: number
      monthlyFee: number
      estimatedSavings: number
      estimatedProduction: number
      contractDuration: number
      installationFee: number
      securityDeposit: number
      whatsIncluded: string[]
      generatedAt: Date
      expiresAt: Date
    }, ExtArgs["result"]["proposal"]>
    composites: {}
  }

  type ProposalGetPayload<S extends boolean | null | undefined | ProposalDefaultArgs> = $Result.GetResult<Prisma.$ProposalPayload, S>

  type ProposalCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ProposalFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ProposalCountAggregateInputType | true
    }

  export interface ProposalDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Proposal'], meta: { name: 'Proposal' } }
    /**
     * Find zero or one Proposal that matches the filter.
     * @param {ProposalFindUniqueArgs} args - Arguments to find a Proposal
     * @example
     * // Get one Proposal
     * const proposal = await prisma.proposal.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProposalFindUniqueArgs>(args: SelectSubset<T, ProposalFindUniqueArgs<ExtArgs>>): Prisma__ProposalClient<$Result.GetResult<Prisma.$ProposalPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Proposal that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ProposalFindUniqueOrThrowArgs} args - Arguments to find a Proposal
     * @example
     * // Get one Proposal
     * const proposal = await prisma.proposal.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProposalFindUniqueOrThrowArgs>(args: SelectSubset<T, ProposalFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProposalClient<$Result.GetResult<Prisma.$ProposalPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Proposal that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProposalFindFirstArgs} args - Arguments to find a Proposal
     * @example
     * // Get one Proposal
     * const proposal = await prisma.proposal.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProposalFindFirstArgs>(args?: SelectSubset<T, ProposalFindFirstArgs<ExtArgs>>): Prisma__ProposalClient<$Result.GetResult<Prisma.$ProposalPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Proposal that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProposalFindFirstOrThrowArgs} args - Arguments to find a Proposal
     * @example
     * // Get one Proposal
     * const proposal = await prisma.proposal.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProposalFindFirstOrThrowArgs>(args?: SelectSubset<T, ProposalFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProposalClient<$Result.GetResult<Prisma.$ProposalPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Proposals that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProposalFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Proposals
     * const proposals = await prisma.proposal.findMany()
     * 
     * // Get first 10 Proposals
     * const proposals = await prisma.proposal.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const proposalWithIdOnly = await prisma.proposal.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProposalFindManyArgs>(args?: SelectSubset<T, ProposalFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProposalPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Proposal.
     * @param {ProposalCreateArgs} args - Arguments to create a Proposal.
     * @example
     * // Create one Proposal
     * const Proposal = await prisma.proposal.create({
     *   data: {
     *     // ... data to create a Proposal
     *   }
     * })
     * 
     */
    create<T extends ProposalCreateArgs>(args: SelectSubset<T, ProposalCreateArgs<ExtArgs>>): Prisma__ProposalClient<$Result.GetResult<Prisma.$ProposalPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Proposals.
     * @param {ProposalCreateManyArgs} args - Arguments to create many Proposals.
     * @example
     * // Create many Proposals
     * const proposal = await prisma.proposal.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProposalCreateManyArgs>(args?: SelectSubset<T, ProposalCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Proposals and returns the data saved in the database.
     * @param {ProposalCreateManyAndReturnArgs} args - Arguments to create many Proposals.
     * @example
     * // Create many Proposals
     * const proposal = await prisma.proposal.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Proposals and only return the `id`
     * const proposalWithIdOnly = await prisma.proposal.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProposalCreateManyAndReturnArgs>(args?: SelectSubset<T, ProposalCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProposalPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Proposal.
     * @param {ProposalDeleteArgs} args - Arguments to delete one Proposal.
     * @example
     * // Delete one Proposal
     * const Proposal = await prisma.proposal.delete({
     *   where: {
     *     // ... filter to delete one Proposal
     *   }
     * })
     * 
     */
    delete<T extends ProposalDeleteArgs>(args: SelectSubset<T, ProposalDeleteArgs<ExtArgs>>): Prisma__ProposalClient<$Result.GetResult<Prisma.$ProposalPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Proposal.
     * @param {ProposalUpdateArgs} args - Arguments to update one Proposal.
     * @example
     * // Update one Proposal
     * const proposal = await prisma.proposal.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProposalUpdateArgs>(args: SelectSubset<T, ProposalUpdateArgs<ExtArgs>>): Prisma__ProposalClient<$Result.GetResult<Prisma.$ProposalPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Proposals.
     * @param {ProposalDeleteManyArgs} args - Arguments to filter Proposals to delete.
     * @example
     * // Delete a few Proposals
     * const { count } = await prisma.proposal.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProposalDeleteManyArgs>(args?: SelectSubset<T, ProposalDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Proposals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProposalUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Proposals
     * const proposal = await prisma.proposal.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProposalUpdateManyArgs>(args: SelectSubset<T, ProposalUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Proposal.
     * @param {ProposalUpsertArgs} args - Arguments to update or create a Proposal.
     * @example
     * // Update or create a Proposal
     * const proposal = await prisma.proposal.upsert({
     *   create: {
     *     // ... data to create a Proposal
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Proposal we want to update
     *   }
     * })
     */
    upsert<T extends ProposalUpsertArgs>(args: SelectSubset<T, ProposalUpsertArgs<ExtArgs>>): Prisma__ProposalClient<$Result.GetResult<Prisma.$ProposalPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Proposals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProposalCountArgs} args - Arguments to filter Proposals to count.
     * @example
     * // Count the number of Proposals
     * const count = await prisma.proposal.count({
     *   where: {
     *     // ... the filter for the Proposals we want to count
     *   }
     * })
    **/
    count<T extends ProposalCountArgs>(
      args?: Subset<T, ProposalCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProposalCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Proposal.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProposalAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProposalAggregateArgs>(args: Subset<T, ProposalAggregateArgs>): Prisma.PrismaPromise<GetProposalAggregateType<T>>

    /**
     * Group by Proposal.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProposalGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProposalGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProposalGroupByArgs['orderBy'] }
        : { orderBy?: ProposalGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProposalGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProposalGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Proposal model
   */
  readonly fields: ProposalFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Proposal.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProposalClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    property<T extends PropertyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PropertyDefaultArgs<ExtArgs>>): Prisma__PropertyClient<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Proposal model
   */ 
  interface ProposalFieldRefs {
    readonly id: FieldRef<"Proposal", 'String'>
    readonly propertyId: FieldRef<"Proposal", 'String'>
    readonly surveyId: FieldRef<"Proposal", 'String'>
    readonly solarCapacity: FieldRef<"Proposal", 'Float'>
    readonly batteryStorage: FieldRef<"Proposal", 'Float'>
    readonly monthlyFee: FieldRef<"Proposal", 'Float'>
    readonly estimatedSavings: FieldRef<"Proposal", 'Float'>
    readonly estimatedProduction: FieldRef<"Proposal", 'Float'>
    readonly contractDuration: FieldRef<"Proposal", 'Int'>
    readonly installationFee: FieldRef<"Proposal", 'Float'>
    readonly securityDeposit: FieldRef<"Proposal", 'Float'>
    readonly whatsIncluded: FieldRef<"Proposal", 'String[]'>
    readonly generatedAt: FieldRef<"Proposal", 'DateTime'>
    readonly expiresAt: FieldRef<"Proposal", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Proposal findUnique
   */
  export type ProposalFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Proposal
     */
    select?: ProposalSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProposalInclude<ExtArgs> | null
    /**
     * Filter, which Proposal to fetch.
     */
    where: ProposalWhereUniqueInput
  }

  /**
   * Proposal findUniqueOrThrow
   */
  export type ProposalFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Proposal
     */
    select?: ProposalSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProposalInclude<ExtArgs> | null
    /**
     * Filter, which Proposal to fetch.
     */
    where: ProposalWhereUniqueInput
  }

  /**
   * Proposal findFirst
   */
  export type ProposalFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Proposal
     */
    select?: ProposalSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProposalInclude<ExtArgs> | null
    /**
     * Filter, which Proposal to fetch.
     */
    where?: ProposalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Proposals to fetch.
     */
    orderBy?: ProposalOrderByWithRelationInput | ProposalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Proposals.
     */
    cursor?: ProposalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Proposals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Proposals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Proposals.
     */
    distinct?: ProposalScalarFieldEnum | ProposalScalarFieldEnum[]
  }

  /**
   * Proposal findFirstOrThrow
   */
  export type ProposalFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Proposal
     */
    select?: ProposalSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProposalInclude<ExtArgs> | null
    /**
     * Filter, which Proposal to fetch.
     */
    where?: ProposalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Proposals to fetch.
     */
    orderBy?: ProposalOrderByWithRelationInput | ProposalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Proposals.
     */
    cursor?: ProposalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Proposals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Proposals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Proposals.
     */
    distinct?: ProposalScalarFieldEnum | ProposalScalarFieldEnum[]
  }

  /**
   * Proposal findMany
   */
  export type ProposalFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Proposal
     */
    select?: ProposalSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProposalInclude<ExtArgs> | null
    /**
     * Filter, which Proposals to fetch.
     */
    where?: ProposalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Proposals to fetch.
     */
    orderBy?: ProposalOrderByWithRelationInput | ProposalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Proposals.
     */
    cursor?: ProposalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Proposals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Proposals.
     */
    skip?: number
    distinct?: ProposalScalarFieldEnum | ProposalScalarFieldEnum[]
  }

  /**
   * Proposal create
   */
  export type ProposalCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Proposal
     */
    select?: ProposalSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProposalInclude<ExtArgs> | null
    /**
     * The data needed to create a Proposal.
     */
    data: XOR<ProposalCreateInput, ProposalUncheckedCreateInput>
  }

  /**
   * Proposal createMany
   */
  export type ProposalCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Proposals.
     */
    data: ProposalCreateManyInput | ProposalCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Proposal createManyAndReturn
   */
  export type ProposalCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Proposal
     */
    select?: ProposalSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Proposals.
     */
    data: ProposalCreateManyInput | ProposalCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProposalIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Proposal update
   */
  export type ProposalUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Proposal
     */
    select?: ProposalSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProposalInclude<ExtArgs> | null
    /**
     * The data needed to update a Proposal.
     */
    data: XOR<ProposalUpdateInput, ProposalUncheckedUpdateInput>
    /**
     * Choose, which Proposal to update.
     */
    where: ProposalWhereUniqueInput
  }

  /**
   * Proposal updateMany
   */
  export type ProposalUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Proposals.
     */
    data: XOR<ProposalUpdateManyMutationInput, ProposalUncheckedUpdateManyInput>
    /**
     * Filter which Proposals to update
     */
    where?: ProposalWhereInput
  }

  /**
   * Proposal upsert
   */
  export type ProposalUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Proposal
     */
    select?: ProposalSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProposalInclude<ExtArgs> | null
    /**
     * The filter to search for the Proposal to update in case it exists.
     */
    where: ProposalWhereUniqueInput
    /**
     * In case the Proposal found by the `where` argument doesn't exist, create a new Proposal with this data.
     */
    create: XOR<ProposalCreateInput, ProposalUncheckedCreateInput>
    /**
     * In case the Proposal was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProposalUpdateInput, ProposalUncheckedUpdateInput>
  }

  /**
   * Proposal delete
   */
  export type ProposalDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Proposal
     */
    select?: ProposalSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProposalInclude<ExtArgs> | null
    /**
     * Filter which Proposal to delete.
     */
    where: ProposalWhereUniqueInput
  }

  /**
   * Proposal deleteMany
   */
  export type ProposalDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Proposals to delete
     */
    where?: ProposalWhereInput
  }

  /**
   * Proposal without action
   */
  export type ProposalDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Proposal
     */
    select?: ProposalSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProposalInclude<ExtArgs> | null
  }


  /**
   * Model Payment
   */

  export type AggregatePayment = {
    _count: PaymentCountAggregateOutputType | null
    _avg: PaymentAvgAggregateOutputType | null
    _sum: PaymentSumAggregateOutputType | null
    _min: PaymentMinAggregateOutputType | null
    _max: PaymentMaxAggregateOutputType | null
  }

  export type PaymentAvgAggregateOutputType = {
    amount: number | null
  }

  export type PaymentSumAggregateOutputType = {
    amount: number | null
  }

  export type PaymentMinAggregateOutputType = {
    id: string | null
    propertyId: string | null
    proposalId: string | null
    orderId: string | null
    transactionId: string | null
    paymentMethod: $Enums.PaymentMethod | null
    amount: number | null
    currency: string | null
    status: $Enums.PaymentStatus | null
    signature: string | null
    description: string | null
    paymentGatewayUrl: string | null
    paidAt: Date | null
    createdAt: Date | null
  }

  export type PaymentMaxAggregateOutputType = {
    id: string | null
    propertyId: string | null
    proposalId: string | null
    orderId: string | null
    transactionId: string | null
    paymentMethod: $Enums.PaymentMethod | null
    amount: number | null
    currency: string | null
    status: $Enums.PaymentStatus | null
    signature: string | null
    description: string | null
    paymentGatewayUrl: string | null
    paidAt: Date | null
    createdAt: Date | null
  }

  export type PaymentCountAggregateOutputType = {
    id: number
    propertyId: number
    proposalId: number
    orderId: number
    transactionId: number
    paymentMethod: number
    amount: number
    currency: number
    status: number
    signature: number
    description: number
    paymentGatewayUrl: number
    paidAt: number
    createdAt: number
    _all: number
  }


  export type PaymentAvgAggregateInputType = {
    amount?: true
  }

  export type PaymentSumAggregateInputType = {
    amount?: true
  }

  export type PaymentMinAggregateInputType = {
    id?: true
    propertyId?: true
    proposalId?: true
    orderId?: true
    transactionId?: true
    paymentMethod?: true
    amount?: true
    currency?: true
    status?: true
    signature?: true
    description?: true
    paymentGatewayUrl?: true
    paidAt?: true
    createdAt?: true
  }

  export type PaymentMaxAggregateInputType = {
    id?: true
    propertyId?: true
    proposalId?: true
    orderId?: true
    transactionId?: true
    paymentMethod?: true
    amount?: true
    currency?: true
    status?: true
    signature?: true
    description?: true
    paymentGatewayUrl?: true
    paidAt?: true
    createdAt?: true
  }

  export type PaymentCountAggregateInputType = {
    id?: true
    propertyId?: true
    proposalId?: true
    orderId?: true
    transactionId?: true
    paymentMethod?: true
    amount?: true
    currency?: true
    status?: true
    signature?: true
    description?: true
    paymentGatewayUrl?: true
    paidAt?: true
    createdAt?: true
    _all?: true
  }

  export type PaymentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Payment to aggregate.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Payments
    **/
    _count?: true | PaymentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PaymentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PaymentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PaymentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PaymentMaxAggregateInputType
  }

  export type GetPaymentAggregateType<T extends PaymentAggregateArgs> = {
        [P in keyof T & keyof AggregatePayment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePayment[P]>
      : GetScalarType<T[P], AggregatePayment[P]>
  }




  export type PaymentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentWhereInput
    orderBy?: PaymentOrderByWithAggregationInput | PaymentOrderByWithAggregationInput[]
    by: PaymentScalarFieldEnum[] | PaymentScalarFieldEnum
    having?: PaymentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PaymentCountAggregateInputType | true
    _avg?: PaymentAvgAggregateInputType
    _sum?: PaymentSumAggregateInputType
    _min?: PaymentMinAggregateInputType
    _max?: PaymentMaxAggregateInputType
  }

  export type PaymentGroupByOutputType = {
    id: string
    propertyId: string
    proposalId: string | null
    orderId: string
    transactionId: string | null
    paymentMethod: $Enums.PaymentMethod
    amount: number
    currency: string
    status: $Enums.PaymentStatus
    signature: string | null
    description: string | null
    paymentGatewayUrl: string | null
    paidAt: Date | null
    createdAt: Date
    _count: PaymentCountAggregateOutputType | null
    _avg: PaymentAvgAggregateOutputType | null
    _sum: PaymentSumAggregateOutputType | null
    _min: PaymentMinAggregateOutputType | null
    _max: PaymentMaxAggregateOutputType | null
  }

  type GetPaymentGroupByPayload<T extends PaymentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PaymentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PaymentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PaymentGroupByOutputType[P]>
            : GetScalarType<T[P], PaymentGroupByOutputType[P]>
        }
      >
    >


  export type PaymentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    propertyId?: boolean
    proposalId?: boolean
    orderId?: boolean
    transactionId?: boolean
    paymentMethod?: boolean
    amount?: boolean
    currency?: boolean
    status?: boolean
    signature?: boolean
    description?: boolean
    paymentGatewayUrl?: boolean
    paidAt?: boolean
    createdAt?: boolean
    property?: boolean | PropertyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["payment"]>

  export type PaymentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    propertyId?: boolean
    proposalId?: boolean
    orderId?: boolean
    transactionId?: boolean
    paymentMethod?: boolean
    amount?: boolean
    currency?: boolean
    status?: boolean
    signature?: boolean
    description?: boolean
    paymentGatewayUrl?: boolean
    paidAt?: boolean
    createdAt?: boolean
    property?: boolean | PropertyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["payment"]>

  export type PaymentSelectScalar = {
    id?: boolean
    propertyId?: boolean
    proposalId?: boolean
    orderId?: boolean
    transactionId?: boolean
    paymentMethod?: boolean
    amount?: boolean
    currency?: boolean
    status?: boolean
    signature?: boolean
    description?: boolean
    paymentGatewayUrl?: boolean
    paidAt?: boolean
    createdAt?: boolean
  }

  export type PaymentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    property?: boolean | PropertyDefaultArgs<ExtArgs>
  }
  export type PaymentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    property?: boolean | PropertyDefaultArgs<ExtArgs>
  }

  export type $PaymentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Payment"
    objects: {
      property: Prisma.$PropertyPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      propertyId: string
      proposalId: string | null
      orderId: string
      transactionId: string | null
      paymentMethod: $Enums.PaymentMethod
      amount: number
      currency: string
      status: $Enums.PaymentStatus
      signature: string | null
      description: string | null
      paymentGatewayUrl: string | null
      paidAt: Date | null
      createdAt: Date
    }, ExtArgs["result"]["payment"]>
    composites: {}
  }

  type PaymentGetPayload<S extends boolean | null | undefined | PaymentDefaultArgs> = $Result.GetResult<Prisma.$PaymentPayload, S>

  type PaymentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PaymentFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PaymentCountAggregateInputType | true
    }

  export interface PaymentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Payment'], meta: { name: 'Payment' } }
    /**
     * Find zero or one Payment that matches the filter.
     * @param {PaymentFindUniqueArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PaymentFindUniqueArgs>(args: SelectSubset<T, PaymentFindUniqueArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Payment that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PaymentFindUniqueOrThrowArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PaymentFindUniqueOrThrowArgs>(args: SelectSubset<T, PaymentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Payment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindFirstArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PaymentFindFirstArgs>(args?: SelectSubset<T, PaymentFindFirstArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Payment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindFirstOrThrowArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PaymentFindFirstOrThrowArgs>(args?: SelectSubset<T, PaymentFindFirstOrThrowArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Payments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Payments
     * const payments = await prisma.payment.findMany()
     * 
     * // Get first 10 Payments
     * const payments = await prisma.payment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const paymentWithIdOnly = await prisma.payment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PaymentFindManyArgs>(args?: SelectSubset<T, PaymentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Payment.
     * @param {PaymentCreateArgs} args - Arguments to create a Payment.
     * @example
     * // Create one Payment
     * const Payment = await prisma.payment.create({
     *   data: {
     *     // ... data to create a Payment
     *   }
     * })
     * 
     */
    create<T extends PaymentCreateArgs>(args: SelectSubset<T, PaymentCreateArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Payments.
     * @param {PaymentCreateManyArgs} args - Arguments to create many Payments.
     * @example
     * // Create many Payments
     * const payment = await prisma.payment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PaymentCreateManyArgs>(args?: SelectSubset<T, PaymentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Payments and returns the data saved in the database.
     * @param {PaymentCreateManyAndReturnArgs} args - Arguments to create many Payments.
     * @example
     * // Create many Payments
     * const payment = await prisma.payment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Payments and only return the `id`
     * const paymentWithIdOnly = await prisma.payment.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PaymentCreateManyAndReturnArgs>(args?: SelectSubset<T, PaymentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Payment.
     * @param {PaymentDeleteArgs} args - Arguments to delete one Payment.
     * @example
     * // Delete one Payment
     * const Payment = await prisma.payment.delete({
     *   where: {
     *     // ... filter to delete one Payment
     *   }
     * })
     * 
     */
    delete<T extends PaymentDeleteArgs>(args: SelectSubset<T, PaymentDeleteArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Payment.
     * @param {PaymentUpdateArgs} args - Arguments to update one Payment.
     * @example
     * // Update one Payment
     * const payment = await prisma.payment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PaymentUpdateArgs>(args: SelectSubset<T, PaymentUpdateArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Payments.
     * @param {PaymentDeleteManyArgs} args - Arguments to filter Payments to delete.
     * @example
     * // Delete a few Payments
     * const { count } = await prisma.payment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PaymentDeleteManyArgs>(args?: SelectSubset<T, PaymentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Payments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Payments
     * const payment = await prisma.payment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PaymentUpdateManyArgs>(args: SelectSubset<T, PaymentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Payment.
     * @param {PaymentUpsertArgs} args - Arguments to update or create a Payment.
     * @example
     * // Update or create a Payment
     * const payment = await prisma.payment.upsert({
     *   create: {
     *     // ... data to create a Payment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Payment we want to update
     *   }
     * })
     */
    upsert<T extends PaymentUpsertArgs>(args: SelectSubset<T, PaymentUpsertArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Payments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentCountArgs} args - Arguments to filter Payments to count.
     * @example
     * // Count the number of Payments
     * const count = await prisma.payment.count({
     *   where: {
     *     // ... the filter for the Payments we want to count
     *   }
     * })
    **/
    count<T extends PaymentCountArgs>(
      args?: Subset<T, PaymentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PaymentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Payment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PaymentAggregateArgs>(args: Subset<T, PaymentAggregateArgs>): Prisma.PrismaPromise<GetPaymentAggregateType<T>>

    /**
     * Group by Payment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PaymentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PaymentGroupByArgs['orderBy'] }
        : { orderBy?: PaymentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PaymentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPaymentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Payment model
   */
  readonly fields: PaymentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Payment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PaymentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    property<T extends PropertyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PropertyDefaultArgs<ExtArgs>>): Prisma__PropertyClient<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Payment model
   */ 
  interface PaymentFieldRefs {
    readonly id: FieldRef<"Payment", 'String'>
    readonly propertyId: FieldRef<"Payment", 'String'>
    readonly proposalId: FieldRef<"Payment", 'String'>
    readonly orderId: FieldRef<"Payment", 'String'>
    readonly transactionId: FieldRef<"Payment", 'String'>
    readonly paymentMethod: FieldRef<"Payment", 'PaymentMethod'>
    readonly amount: FieldRef<"Payment", 'Float'>
    readonly currency: FieldRef<"Payment", 'String'>
    readonly status: FieldRef<"Payment", 'PaymentStatus'>
    readonly signature: FieldRef<"Payment", 'String'>
    readonly description: FieldRef<"Payment", 'String'>
    readonly paymentGatewayUrl: FieldRef<"Payment", 'String'>
    readonly paidAt: FieldRef<"Payment", 'DateTime'>
    readonly createdAt: FieldRef<"Payment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Payment findUnique
   */
  export type PaymentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment findUniqueOrThrow
   */
  export type PaymentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment findFirst
   */
  export type PaymentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payments.
     */
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment findFirstOrThrow
   */
  export type PaymentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payments.
     */
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment findMany
   */
  export type PaymentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payments to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment create
   */
  export type PaymentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The data needed to create a Payment.
     */
    data: XOR<PaymentCreateInput, PaymentUncheckedCreateInput>
  }

  /**
   * Payment createMany
   */
  export type PaymentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Payments.
     */
    data: PaymentCreateManyInput | PaymentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Payment createManyAndReturn
   */
  export type PaymentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Payments.
     */
    data: PaymentCreateManyInput | PaymentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Payment update
   */
  export type PaymentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The data needed to update a Payment.
     */
    data: XOR<PaymentUpdateInput, PaymentUncheckedUpdateInput>
    /**
     * Choose, which Payment to update.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment updateMany
   */
  export type PaymentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Payments.
     */
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyInput>
    /**
     * Filter which Payments to update
     */
    where?: PaymentWhereInput
  }

  /**
   * Payment upsert
   */
  export type PaymentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The filter to search for the Payment to update in case it exists.
     */
    where: PaymentWhereUniqueInput
    /**
     * In case the Payment found by the `where` argument doesn't exist, create a new Payment with this data.
     */
    create: XOR<PaymentCreateInput, PaymentUncheckedCreateInput>
    /**
     * In case the Payment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PaymentUpdateInput, PaymentUncheckedUpdateInput>
  }

  /**
   * Payment delete
   */
  export type PaymentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter which Payment to delete.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment deleteMany
   */
  export type PaymentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Payments to delete
     */
    where?: PaymentWhereInput
  }

  /**
   * Payment without action
   */
  export type PaymentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
  }


  /**
   * Model InstallationProgress
   */

  export type AggregateInstallationProgress = {
    _count: InstallationProgressCountAggregateOutputType | null
    _min: InstallationProgressMinAggregateOutputType | null
    _max: InstallationProgressMaxAggregateOutputType | null
  }

  export type InstallationProgressMinAggregateOutputType = {
    id: string | null
    propertyId: string | null
    paymentConfirmed: boolean | null
    paymentConfirmedAt: Date | null
    engineerAssigned: boolean | null
    engineerName: string | null
    engineerPhone: string | null
    engineerAssignedAt: Date | null
    siteSurveyScheduled: boolean | null
    siteSurveyDate: Date | null
    installationStarted: boolean | null
    installationDate: Date | null
    systemActivated: boolean | null
    activationDate: Date | null
    estimatedCompletion: string | null
    updatedAt: Date | null
  }

  export type InstallationProgressMaxAggregateOutputType = {
    id: string | null
    propertyId: string | null
    paymentConfirmed: boolean | null
    paymentConfirmedAt: Date | null
    engineerAssigned: boolean | null
    engineerName: string | null
    engineerPhone: string | null
    engineerAssignedAt: Date | null
    siteSurveyScheduled: boolean | null
    siteSurveyDate: Date | null
    installationStarted: boolean | null
    installationDate: Date | null
    systemActivated: boolean | null
    activationDate: Date | null
    estimatedCompletion: string | null
    updatedAt: Date | null
  }

  export type InstallationProgressCountAggregateOutputType = {
    id: number
    propertyId: number
    paymentConfirmed: number
    paymentConfirmedAt: number
    engineerAssigned: number
    engineerName: number
    engineerPhone: number
    engineerAssignedAt: number
    siteSurveyScheduled: number
    siteSurveyDate: number
    installationStarted: number
    installationDate: number
    systemActivated: number
    activationDate: number
    estimatedCompletion: number
    updatedAt: number
    _all: number
  }


  export type InstallationProgressMinAggregateInputType = {
    id?: true
    propertyId?: true
    paymentConfirmed?: true
    paymentConfirmedAt?: true
    engineerAssigned?: true
    engineerName?: true
    engineerPhone?: true
    engineerAssignedAt?: true
    siteSurveyScheduled?: true
    siteSurveyDate?: true
    installationStarted?: true
    installationDate?: true
    systemActivated?: true
    activationDate?: true
    estimatedCompletion?: true
    updatedAt?: true
  }

  export type InstallationProgressMaxAggregateInputType = {
    id?: true
    propertyId?: true
    paymentConfirmed?: true
    paymentConfirmedAt?: true
    engineerAssigned?: true
    engineerName?: true
    engineerPhone?: true
    engineerAssignedAt?: true
    siteSurveyScheduled?: true
    siteSurveyDate?: true
    installationStarted?: true
    installationDate?: true
    systemActivated?: true
    activationDate?: true
    estimatedCompletion?: true
    updatedAt?: true
  }

  export type InstallationProgressCountAggregateInputType = {
    id?: true
    propertyId?: true
    paymentConfirmed?: true
    paymentConfirmedAt?: true
    engineerAssigned?: true
    engineerName?: true
    engineerPhone?: true
    engineerAssignedAt?: true
    siteSurveyScheduled?: true
    siteSurveyDate?: true
    installationStarted?: true
    installationDate?: true
    systemActivated?: true
    activationDate?: true
    estimatedCompletion?: true
    updatedAt?: true
    _all?: true
  }

  export type InstallationProgressAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which InstallationProgress to aggregate.
     */
    where?: InstallationProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InstallationProgresses to fetch.
     */
    orderBy?: InstallationProgressOrderByWithRelationInput | InstallationProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: InstallationProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InstallationProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InstallationProgresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned InstallationProgresses
    **/
    _count?: true | InstallationProgressCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InstallationProgressMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InstallationProgressMaxAggregateInputType
  }

  export type GetInstallationProgressAggregateType<T extends InstallationProgressAggregateArgs> = {
        [P in keyof T & keyof AggregateInstallationProgress]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInstallationProgress[P]>
      : GetScalarType<T[P], AggregateInstallationProgress[P]>
  }




  export type InstallationProgressGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InstallationProgressWhereInput
    orderBy?: InstallationProgressOrderByWithAggregationInput | InstallationProgressOrderByWithAggregationInput[]
    by: InstallationProgressScalarFieldEnum[] | InstallationProgressScalarFieldEnum
    having?: InstallationProgressScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InstallationProgressCountAggregateInputType | true
    _min?: InstallationProgressMinAggregateInputType
    _max?: InstallationProgressMaxAggregateInputType
  }

  export type InstallationProgressGroupByOutputType = {
    id: string
    propertyId: string
    paymentConfirmed: boolean
    paymentConfirmedAt: Date | null
    engineerAssigned: boolean
    engineerName: string | null
    engineerPhone: string | null
    engineerAssignedAt: Date | null
    siteSurveyScheduled: boolean
    siteSurveyDate: Date | null
    installationStarted: boolean
    installationDate: Date | null
    systemActivated: boolean
    activationDate: Date | null
    estimatedCompletion: string | null
    updatedAt: Date
    _count: InstallationProgressCountAggregateOutputType | null
    _min: InstallationProgressMinAggregateOutputType | null
    _max: InstallationProgressMaxAggregateOutputType | null
  }

  type GetInstallationProgressGroupByPayload<T extends InstallationProgressGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<InstallationProgressGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InstallationProgressGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InstallationProgressGroupByOutputType[P]>
            : GetScalarType<T[P], InstallationProgressGroupByOutputType[P]>
        }
      >
    >


  export type InstallationProgressSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    propertyId?: boolean
    paymentConfirmed?: boolean
    paymentConfirmedAt?: boolean
    engineerAssigned?: boolean
    engineerName?: boolean
    engineerPhone?: boolean
    engineerAssignedAt?: boolean
    siteSurveyScheduled?: boolean
    siteSurveyDate?: boolean
    installationStarted?: boolean
    installationDate?: boolean
    systemActivated?: boolean
    activationDate?: boolean
    estimatedCompletion?: boolean
    updatedAt?: boolean
    property?: boolean | PropertyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["installationProgress"]>

  export type InstallationProgressSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    propertyId?: boolean
    paymentConfirmed?: boolean
    paymentConfirmedAt?: boolean
    engineerAssigned?: boolean
    engineerName?: boolean
    engineerPhone?: boolean
    engineerAssignedAt?: boolean
    siteSurveyScheduled?: boolean
    siteSurveyDate?: boolean
    installationStarted?: boolean
    installationDate?: boolean
    systemActivated?: boolean
    activationDate?: boolean
    estimatedCompletion?: boolean
    updatedAt?: boolean
    property?: boolean | PropertyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["installationProgress"]>

  export type InstallationProgressSelectScalar = {
    id?: boolean
    propertyId?: boolean
    paymentConfirmed?: boolean
    paymentConfirmedAt?: boolean
    engineerAssigned?: boolean
    engineerName?: boolean
    engineerPhone?: boolean
    engineerAssignedAt?: boolean
    siteSurveyScheduled?: boolean
    siteSurveyDate?: boolean
    installationStarted?: boolean
    installationDate?: boolean
    systemActivated?: boolean
    activationDate?: boolean
    estimatedCompletion?: boolean
    updatedAt?: boolean
  }

  export type InstallationProgressInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    property?: boolean | PropertyDefaultArgs<ExtArgs>
  }
  export type InstallationProgressIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    property?: boolean | PropertyDefaultArgs<ExtArgs>
  }

  export type $InstallationProgressPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "InstallationProgress"
    objects: {
      property: Prisma.$PropertyPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      propertyId: string
      paymentConfirmed: boolean
      paymentConfirmedAt: Date | null
      engineerAssigned: boolean
      engineerName: string | null
      engineerPhone: string | null
      engineerAssignedAt: Date | null
      siteSurveyScheduled: boolean
      siteSurveyDate: Date | null
      installationStarted: boolean
      installationDate: Date | null
      systemActivated: boolean
      activationDate: Date | null
      estimatedCompletion: string | null
      updatedAt: Date
    }, ExtArgs["result"]["installationProgress"]>
    composites: {}
  }

  type InstallationProgressGetPayload<S extends boolean | null | undefined | InstallationProgressDefaultArgs> = $Result.GetResult<Prisma.$InstallationProgressPayload, S>

  type InstallationProgressCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<InstallationProgressFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: InstallationProgressCountAggregateInputType | true
    }

  export interface InstallationProgressDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['InstallationProgress'], meta: { name: 'InstallationProgress' } }
    /**
     * Find zero or one InstallationProgress that matches the filter.
     * @param {InstallationProgressFindUniqueArgs} args - Arguments to find a InstallationProgress
     * @example
     * // Get one InstallationProgress
     * const installationProgress = await prisma.installationProgress.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends InstallationProgressFindUniqueArgs>(args: SelectSubset<T, InstallationProgressFindUniqueArgs<ExtArgs>>): Prisma__InstallationProgressClient<$Result.GetResult<Prisma.$InstallationProgressPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one InstallationProgress that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {InstallationProgressFindUniqueOrThrowArgs} args - Arguments to find a InstallationProgress
     * @example
     * // Get one InstallationProgress
     * const installationProgress = await prisma.installationProgress.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends InstallationProgressFindUniqueOrThrowArgs>(args: SelectSubset<T, InstallationProgressFindUniqueOrThrowArgs<ExtArgs>>): Prisma__InstallationProgressClient<$Result.GetResult<Prisma.$InstallationProgressPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first InstallationProgress that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstallationProgressFindFirstArgs} args - Arguments to find a InstallationProgress
     * @example
     * // Get one InstallationProgress
     * const installationProgress = await prisma.installationProgress.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends InstallationProgressFindFirstArgs>(args?: SelectSubset<T, InstallationProgressFindFirstArgs<ExtArgs>>): Prisma__InstallationProgressClient<$Result.GetResult<Prisma.$InstallationProgressPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first InstallationProgress that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstallationProgressFindFirstOrThrowArgs} args - Arguments to find a InstallationProgress
     * @example
     * // Get one InstallationProgress
     * const installationProgress = await prisma.installationProgress.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends InstallationProgressFindFirstOrThrowArgs>(args?: SelectSubset<T, InstallationProgressFindFirstOrThrowArgs<ExtArgs>>): Prisma__InstallationProgressClient<$Result.GetResult<Prisma.$InstallationProgressPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more InstallationProgresses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstallationProgressFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all InstallationProgresses
     * const installationProgresses = await prisma.installationProgress.findMany()
     * 
     * // Get first 10 InstallationProgresses
     * const installationProgresses = await prisma.installationProgress.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const installationProgressWithIdOnly = await prisma.installationProgress.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends InstallationProgressFindManyArgs>(args?: SelectSubset<T, InstallationProgressFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InstallationProgressPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a InstallationProgress.
     * @param {InstallationProgressCreateArgs} args - Arguments to create a InstallationProgress.
     * @example
     * // Create one InstallationProgress
     * const InstallationProgress = await prisma.installationProgress.create({
     *   data: {
     *     // ... data to create a InstallationProgress
     *   }
     * })
     * 
     */
    create<T extends InstallationProgressCreateArgs>(args: SelectSubset<T, InstallationProgressCreateArgs<ExtArgs>>): Prisma__InstallationProgressClient<$Result.GetResult<Prisma.$InstallationProgressPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many InstallationProgresses.
     * @param {InstallationProgressCreateManyArgs} args - Arguments to create many InstallationProgresses.
     * @example
     * // Create many InstallationProgresses
     * const installationProgress = await prisma.installationProgress.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends InstallationProgressCreateManyArgs>(args?: SelectSubset<T, InstallationProgressCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many InstallationProgresses and returns the data saved in the database.
     * @param {InstallationProgressCreateManyAndReturnArgs} args - Arguments to create many InstallationProgresses.
     * @example
     * // Create many InstallationProgresses
     * const installationProgress = await prisma.installationProgress.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many InstallationProgresses and only return the `id`
     * const installationProgressWithIdOnly = await prisma.installationProgress.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends InstallationProgressCreateManyAndReturnArgs>(args?: SelectSubset<T, InstallationProgressCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InstallationProgressPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a InstallationProgress.
     * @param {InstallationProgressDeleteArgs} args - Arguments to delete one InstallationProgress.
     * @example
     * // Delete one InstallationProgress
     * const InstallationProgress = await prisma.installationProgress.delete({
     *   where: {
     *     // ... filter to delete one InstallationProgress
     *   }
     * })
     * 
     */
    delete<T extends InstallationProgressDeleteArgs>(args: SelectSubset<T, InstallationProgressDeleteArgs<ExtArgs>>): Prisma__InstallationProgressClient<$Result.GetResult<Prisma.$InstallationProgressPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one InstallationProgress.
     * @param {InstallationProgressUpdateArgs} args - Arguments to update one InstallationProgress.
     * @example
     * // Update one InstallationProgress
     * const installationProgress = await prisma.installationProgress.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends InstallationProgressUpdateArgs>(args: SelectSubset<T, InstallationProgressUpdateArgs<ExtArgs>>): Prisma__InstallationProgressClient<$Result.GetResult<Prisma.$InstallationProgressPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more InstallationProgresses.
     * @param {InstallationProgressDeleteManyArgs} args - Arguments to filter InstallationProgresses to delete.
     * @example
     * // Delete a few InstallationProgresses
     * const { count } = await prisma.installationProgress.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends InstallationProgressDeleteManyArgs>(args?: SelectSubset<T, InstallationProgressDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more InstallationProgresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstallationProgressUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many InstallationProgresses
     * const installationProgress = await prisma.installationProgress.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends InstallationProgressUpdateManyArgs>(args: SelectSubset<T, InstallationProgressUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one InstallationProgress.
     * @param {InstallationProgressUpsertArgs} args - Arguments to update or create a InstallationProgress.
     * @example
     * // Update or create a InstallationProgress
     * const installationProgress = await prisma.installationProgress.upsert({
     *   create: {
     *     // ... data to create a InstallationProgress
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the InstallationProgress we want to update
     *   }
     * })
     */
    upsert<T extends InstallationProgressUpsertArgs>(args: SelectSubset<T, InstallationProgressUpsertArgs<ExtArgs>>): Prisma__InstallationProgressClient<$Result.GetResult<Prisma.$InstallationProgressPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of InstallationProgresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstallationProgressCountArgs} args - Arguments to filter InstallationProgresses to count.
     * @example
     * // Count the number of InstallationProgresses
     * const count = await prisma.installationProgress.count({
     *   where: {
     *     // ... the filter for the InstallationProgresses we want to count
     *   }
     * })
    **/
    count<T extends InstallationProgressCountArgs>(
      args?: Subset<T, InstallationProgressCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InstallationProgressCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a InstallationProgress.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstallationProgressAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends InstallationProgressAggregateArgs>(args: Subset<T, InstallationProgressAggregateArgs>): Prisma.PrismaPromise<GetInstallationProgressAggregateType<T>>

    /**
     * Group by InstallationProgress.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstallationProgressGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends InstallationProgressGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InstallationProgressGroupByArgs['orderBy'] }
        : { orderBy?: InstallationProgressGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, InstallationProgressGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInstallationProgressGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the InstallationProgress model
   */
  readonly fields: InstallationProgressFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for InstallationProgress.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__InstallationProgressClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    property<T extends PropertyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PropertyDefaultArgs<ExtArgs>>): Prisma__PropertyClient<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the InstallationProgress model
   */ 
  interface InstallationProgressFieldRefs {
    readonly id: FieldRef<"InstallationProgress", 'String'>
    readonly propertyId: FieldRef<"InstallationProgress", 'String'>
    readonly paymentConfirmed: FieldRef<"InstallationProgress", 'Boolean'>
    readonly paymentConfirmedAt: FieldRef<"InstallationProgress", 'DateTime'>
    readonly engineerAssigned: FieldRef<"InstallationProgress", 'Boolean'>
    readonly engineerName: FieldRef<"InstallationProgress", 'String'>
    readonly engineerPhone: FieldRef<"InstallationProgress", 'String'>
    readonly engineerAssignedAt: FieldRef<"InstallationProgress", 'DateTime'>
    readonly siteSurveyScheduled: FieldRef<"InstallationProgress", 'Boolean'>
    readonly siteSurveyDate: FieldRef<"InstallationProgress", 'DateTime'>
    readonly installationStarted: FieldRef<"InstallationProgress", 'Boolean'>
    readonly installationDate: FieldRef<"InstallationProgress", 'DateTime'>
    readonly systemActivated: FieldRef<"InstallationProgress", 'Boolean'>
    readonly activationDate: FieldRef<"InstallationProgress", 'DateTime'>
    readonly estimatedCompletion: FieldRef<"InstallationProgress", 'String'>
    readonly updatedAt: FieldRef<"InstallationProgress", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * InstallationProgress findUnique
   */
  export type InstallationProgressFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InstallationProgress
     */
    select?: InstallationProgressSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstallationProgressInclude<ExtArgs> | null
    /**
     * Filter, which InstallationProgress to fetch.
     */
    where: InstallationProgressWhereUniqueInput
  }

  /**
   * InstallationProgress findUniqueOrThrow
   */
  export type InstallationProgressFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InstallationProgress
     */
    select?: InstallationProgressSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstallationProgressInclude<ExtArgs> | null
    /**
     * Filter, which InstallationProgress to fetch.
     */
    where: InstallationProgressWhereUniqueInput
  }

  /**
   * InstallationProgress findFirst
   */
  export type InstallationProgressFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InstallationProgress
     */
    select?: InstallationProgressSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstallationProgressInclude<ExtArgs> | null
    /**
     * Filter, which InstallationProgress to fetch.
     */
    where?: InstallationProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InstallationProgresses to fetch.
     */
    orderBy?: InstallationProgressOrderByWithRelationInput | InstallationProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for InstallationProgresses.
     */
    cursor?: InstallationProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InstallationProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InstallationProgresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InstallationProgresses.
     */
    distinct?: InstallationProgressScalarFieldEnum | InstallationProgressScalarFieldEnum[]
  }

  /**
   * InstallationProgress findFirstOrThrow
   */
  export type InstallationProgressFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InstallationProgress
     */
    select?: InstallationProgressSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstallationProgressInclude<ExtArgs> | null
    /**
     * Filter, which InstallationProgress to fetch.
     */
    where?: InstallationProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InstallationProgresses to fetch.
     */
    orderBy?: InstallationProgressOrderByWithRelationInput | InstallationProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for InstallationProgresses.
     */
    cursor?: InstallationProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InstallationProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InstallationProgresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InstallationProgresses.
     */
    distinct?: InstallationProgressScalarFieldEnum | InstallationProgressScalarFieldEnum[]
  }

  /**
   * InstallationProgress findMany
   */
  export type InstallationProgressFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InstallationProgress
     */
    select?: InstallationProgressSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstallationProgressInclude<ExtArgs> | null
    /**
     * Filter, which InstallationProgresses to fetch.
     */
    where?: InstallationProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InstallationProgresses to fetch.
     */
    orderBy?: InstallationProgressOrderByWithRelationInput | InstallationProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing InstallationProgresses.
     */
    cursor?: InstallationProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InstallationProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InstallationProgresses.
     */
    skip?: number
    distinct?: InstallationProgressScalarFieldEnum | InstallationProgressScalarFieldEnum[]
  }

  /**
   * InstallationProgress create
   */
  export type InstallationProgressCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InstallationProgress
     */
    select?: InstallationProgressSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstallationProgressInclude<ExtArgs> | null
    /**
     * The data needed to create a InstallationProgress.
     */
    data: XOR<InstallationProgressCreateInput, InstallationProgressUncheckedCreateInput>
  }

  /**
   * InstallationProgress createMany
   */
  export type InstallationProgressCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many InstallationProgresses.
     */
    data: InstallationProgressCreateManyInput | InstallationProgressCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * InstallationProgress createManyAndReturn
   */
  export type InstallationProgressCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InstallationProgress
     */
    select?: InstallationProgressSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many InstallationProgresses.
     */
    data: InstallationProgressCreateManyInput | InstallationProgressCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstallationProgressIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * InstallationProgress update
   */
  export type InstallationProgressUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InstallationProgress
     */
    select?: InstallationProgressSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstallationProgressInclude<ExtArgs> | null
    /**
     * The data needed to update a InstallationProgress.
     */
    data: XOR<InstallationProgressUpdateInput, InstallationProgressUncheckedUpdateInput>
    /**
     * Choose, which InstallationProgress to update.
     */
    where: InstallationProgressWhereUniqueInput
  }

  /**
   * InstallationProgress updateMany
   */
  export type InstallationProgressUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update InstallationProgresses.
     */
    data: XOR<InstallationProgressUpdateManyMutationInput, InstallationProgressUncheckedUpdateManyInput>
    /**
     * Filter which InstallationProgresses to update
     */
    where?: InstallationProgressWhereInput
  }

  /**
   * InstallationProgress upsert
   */
  export type InstallationProgressUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InstallationProgress
     */
    select?: InstallationProgressSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstallationProgressInclude<ExtArgs> | null
    /**
     * The filter to search for the InstallationProgress to update in case it exists.
     */
    where: InstallationProgressWhereUniqueInput
    /**
     * In case the InstallationProgress found by the `where` argument doesn't exist, create a new InstallationProgress with this data.
     */
    create: XOR<InstallationProgressCreateInput, InstallationProgressUncheckedCreateInput>
    /**
     * In case the InstallationProgress was found with the provided `where` argument, update it with this data.
     */
    update: XOR<InstallationProgressUpdateInput, InstallationProgressUncheckedUpdateInput>
  }

  /**
   * InstallationProgress delete
   */
  export type InstallationProgressDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InstallationProgress
     */
    select?: InstallationProgressSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstallationProgressInclude<ExtArgs> | null
    /**
     * Filter which InstallationProgress to delete.
     */
    where: InstallationProgressWhereUniqueInput
  }

  /**
   * InstallationProgress deleteMany
   */
  export type InstallationProgressDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which InstallationProgresses to delete
     */
    where?: InstallationProgressWhereInput
  }

  /**
   * InstallationProgress without action
   */
  export type InstallationProgressDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InstallationProgress
     */
    select?: InstallationProgressSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstallationProgressInclude<ExtArgs> | null
  }


  /**
   * Model EnergyStat
   */

  export type AggregateEnergyStat = {
    _count: EnergyStatCountAggregateOutputType | null
    _avg: EnergyStatAvgAggregateOutputType | null
    _sum: EnergyStatSumAggregateOutputType | null
    _min: EnergyStatMinAggregateOutputType | null
    _max: EnergyStatMaxAggregateOutputType | null
  }

  export type EnergyStatAvgAggregateOutputType = {
    production: number | null
    consumption: number | null
    gridUsage: number | null
    batteryPercent: number | null
    solarKw: number | null
    gridKw: number | null
  }

  export type EnergyStatSumAggregateOutputType = {
    production: number | null
    consumption: number | null
    gridUsage: number | null
    batteryPercent: number | null
    solarKw: number | null
    gridKw: number | null
  }

  export type EnergyStatMinAggregateOutputType = {
    id: string | null
    propertyId: string | null
    date: Date | null
    period: string | null
    production: number | null
    consumption: number | null
    gridUsage: number | null
    batteryPercent: number | null
    solarKw: number | null
    gridKw: number | null
    exporting: boolean | null
  }

  export type EnergyStatMaxAggregateOutputType = {
    id: string | null
    propertyId: string | null
    date: Date | null
    period: string | null
    production: number | null
    consumption: number | null
    gridUsage: number | null
    batteryPercent: number | null
    solarKw: number | null
    gridKw: number | null
    exporting: boolean | null
  }

  export type EnergyStatCountAggregateOutputType = {
    id: number
    propertyId: number
    date: number
    period: number
    production: number
    consumption: number
    gridUsage: number
    batteryPercent: number
    solarKw: number
    gridKw: number
    exporting: number
    _all: number
  }


  export type EnergyStatAvgAggregateInputType = {
    production?: true
    consumption?: true
    gridUsage?: true
    batteryPercent?: true
    solarKw?: true
    gridKw?: true
  }

  export type EnergyStatSumAggregateInputType = {
    production?: true
    consumption?: true
    gridUsage?: true
    batteryPercent?: true
    solarKw?: true
    gridKw?: true
  }

  export type EnergyStatMinAggregateInputType = {
    id?: true
    propertyId?: true
    date?: true
    period?: true
    production?: true
    consumption?: true
    gridUsage?: true
    batteryPercent?: true
    solarKw?: true
    gridKw?: true
    exporting?: true
  }

  export type EnergyStatMaxAggregateInputType = {
    id?: true
    propertyId?: true
    date?: true
    period?: true
    production?: true
    consumption?: true
    gridUsage?: true
    batteryPercent?: true
    solarKw?: true
    gridKw?: true
    exporting?: true
  }

  export type EnergyStatCountAggregateInputType = {
    id?: true
    propertyId?: true
    date?: true
    period?: true
    production?: true
    consumption?: true
    gridUsage?: true
    batteryPercent?: true
    solarKw?: true
    gridKw?: true
    exporting?: true
    _all?: true
  }

  export type EnergyStatAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EnergyStat to aggregate.
     */
    where?: EnergyStatWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EnergyStats to fetch.
     */
    orderBy?: EnergyStatOrderByWithRelationInput | EnergyStatOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EnergyStatWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EnergyStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EnergyStats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EnergyStats
    **/
    _count?: true | EnergyStatCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EnergyStatAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EnergyStatSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EnergyStatMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EnergyStatMaxAggregateInputType
  }

  export type GetEnergyStatAggregateType<T extends EnergyStatAggregateArgs> = {
        [P in keyof T & keyof AggregateEnergyStat]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEnergyStat[P]>
      : GetScalarType<T[P], AggregateEnergyStat[P]>
  }




  export type EnergyStatGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EnergyStatWhereInput
    orderBy?: EnergyStatOrderByWithAggregationInput | EnergyStatOrderByWithAggregationInput[]
    by: EnergyStatScalarFieldEnum[] | EnergyStatScalarFieldEnum
    having?: EnergyStatScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EnergyStatCountAggregateInputType | true
    _avg?: EnergyStatAvgAggregateInputType
    _sum?: EnergyStatSumAggregateInputType
    _min?: EnergyStatMinAggregateInputType
    _max?: EnergyStatMaxAggregateInputType
  }

  export type EnergyStatGroupByOutputType = {
    id: string
    propertyId: string
    date: Date
    period: string
    production: number
    consumption: number
    gridUsage: number
    batteryPercent: number | null
    solarKw: number | null
    gridKw: number | null
    exporting: boolean | null
    _count: EnergyStatCountAggregateOutputType | null
    _avg: EnergyStatAvgAggregateOutputType | null
    _sum: EnergyStatSumAggregateOutputType | null
    _min: EnergyStatMinAggregateOutputType | null
    _max: EnergyStatMaxAggregateOutputType | null
  }

  type GetEnergyStatGroupByPayload<T extends EnergyStatGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EnergyStatGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EnergyStatGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EnergyStatGroupByOutputType[P]>
            : GetScalarType<T[P], EnergyStatGroupByOutputType[P]>
        }
      >
    >


  export type EnergyStatSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    propertyId?: boolean
    date?: boolean
    period?: boolean
    production?: boolean
    consumption?: boolean
    gridUsage?: boolean
    batteryPercent?: boolean
    solarKw?: boolean
    gridKw?: boolean
    exporting?: boolean
    property?: boolean | PropertyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["energyStat"]>

  export type EnergyStatSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    propertyId?: boolean
    date?: boolean
    period?: boolean
    production?: boolean
    consumption?: boolean
    gridUsage?: boolean
    batteryPercent?: boolean
    solarKw?: boolean
    gridKw?: boolean
    exporting?: boolean
    property?: boolean | PropertyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["energyStat"]>

  export type EnergyStatSelectScalar = {
    id?: boolean
    propertyId?: boolean
    date?: boolean
    period?: boolean
    production?: boolean
    consumption?: boolean
    gridUsage?: boolean
    batteryPercent?: boolean
    solarKw?: boolean
    gridKw?: boolean
    exporting?: boolean
  }

  export type EnergyStatInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    property?: boolean | PropertyDefaultArgs<ExtArgs>
  }
  export type EnergyStatIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    property?: boolean | PropertyDefaultArgs<ExtArgs>
  }

  export type $EnergyStatPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EnergyStat"
    objects: {
      property: Prisma.$PropertyPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      propertyId: string
      date: Date
      period: string
      production: number
      consumption: number
      gridUsage: number
      batteryPercent: number | null
      solarKw: number | null
      gridKw: number | null
      exporting: boolean | null
    }, ExtArgs["result"]["energyStat"]>
    composites: {}
  }

  type EnergyStatGetPayload<S extends boolean | null | undefined | EnergyStatDefaultArgs> = $Result.GetResult<Prisma.$EnergyStatPayload, S>

  type EnergyStatCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<EnergyStatFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: EnergyStatCountAggregateInputType | true
    }

  export interface EnergyStatDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EnergyStat'], meta: { name: 'EnergyStat' } }
    /**
     * Find zero or one EnergyStat that matches the filter.
     * @param {EnergyStatFindUniqueArgs} args - Arguments to find a EnergyStat
     * @example
     * // Get one EnergyStat
     * const energyStat = await prisma.energyStat.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EnergyStatFindUniqueArgs>(args: SelectSubset<T, EnergyStatFindUniqueArgs<ExtArgs>>): Prisma__EnergyStatClient<$Result.GetResult<Prisma.$EnergyStatPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one EnergyStat that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {EnergyStatFindUniqueOrThrowArgs} args - Arguments to find a EnergyStat
     * @example
     * // Get one EnergyStat
     * const energyStat = await prisma.energyStat.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EnergyStatFindUniqueOrThrowArgs>(args: SelectSubset<T, EnergyStatFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EnergyStatClient<$Result.GetResult<Prisma.$EnergyStatPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first EnergyStat that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnergyStatFindFirstArgs} args - Arguments to find a EnergyStat
     * @example
     * // Get one EnergyStat
     * const energyStat = await prisma.energyStat.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EnergyStatFindFirstArgs>(args?: SelectSubset<T, EnergyStatFindFirstArgs<ExtArgs>>): Prisma__EnergyStatClient<$Result.GetResult<Prisma.$EnergyStatPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first EnergyStat that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnergyStatFindFirstOrThrowArgs} args - Arguments to find a EnergyStat
     * @example
     * // Get one EnergyStat
     * const energyStat = await prisma.energyStat.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EnergyStatFindFirstOrThrowArgs>(args?: SelectSubset<T, EnergyStatFindFirstOrThrowArgs<ExtArgs>>): Prisma__EnergyStatClient<$Result.GetResult<Prisma.$EnergyStatPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more EnergyStats that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnergyStatFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EnergyStats
     * const energyStats = await prisma.energyStat.findMany()
     * 
     * // Get first 10 EnergyStats
     * const energyStats = await prisma.energyStat.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const energyStatWithIdOnly = await prisma.energyStat.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EnergyStatFindManyArgs>(args?: SelectSubset<T, EnergyStatFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EnergyStatPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a EnergyStat.
     * @param {EnergyStatCreateArgs} args - Arguments to create a EnergyStat.
     * @example
     * // Create one EnergyStat
     * const EnergyStat = await prisma.energyStat.create({
     *   data: {
     *     // ... data to create a EnergyStat
     *   }
     * })
     * 
     */
    create<T extends EnergyStatCreateArgs>(args: SelectSubset<T, EnergyStatCreateArgs<ExtArgs>>): Prisma__EnergyStatClient<$Result.GetResult<Prisma.$EnergyStatPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many EnergyStats.
     * @param {EnergyStatCreateManyArgs} args - Arguments to create many EnergyStats.
     * @example
     * // Create many EnergyStats
     * const energyStat = await prisma.energyStat.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EnergyStatCreateManyArgs>(args?: SelectSubset<T, EnergyStatCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many EnergyStats and returns the data saved in the database.
     * @param {EnergyStatCreateManyAndReturnArgs} args - Arguments to create many EnergyStats.
     * @example
     * // Create many EnergyStats
     * const energyStat = await prisma.energyStat.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many EnergyStats and only return the `id`
     * const energyStatWithIdOnly = await prisma.energyStat.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EnergyStatCreateManyAndReturnArgs>(args?: SelectSubset<T, EnergyStatCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EnergyStatPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a EnergyStat.
     * @param {EnergyStatDeleteArgs} args - Arguments to delete one EnergyStat.
     * @example
     * // Delete one EnergyStat
     * const EnergyStat = await prisma.energyStat.delete({
     *   where: {
     *     // ... filter to delete one EnergyStat
     *   }
     * })
     * 
     */
    delete<T extends EnergyStatDeleteArgs>(args: SelectSubset<T, EnergyStatDeleteArgs<ExtArgs>>): Prisma__EnergyStatClient<$Result.GetResult<Prisma.$EnergyStatPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one EnergyStat.
     * @param {EnergyStatUpdateArgs} args - Arguments to update one EnergyStat.
     * @example
     * // Update one EnergyStat
     * const energyStat = await prisma.energyStat.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EnergyStatUpdateArgs>(args: SelectSubset<T, EnergyStatUpdateArgs<ExtArgs>>): Prisma__EnergyStatClient<$Result.GetResult<Prisma.$EnergyStatPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more EnergyStats.
     * @param {EnergyStatDeleteManyArgs} args - Arguments to filter EnergyStats to delete.
     * @example
     * // Delete a few EnergyStats
     * const { count } = await prisma.energyStat.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EnergyStatDeleteManyArgs>(args?: SelectSubset<T, EnergyStatDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EnergyStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnergyStatUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EnergyStats
     * const energyStat = await prisma.energyStat.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EnergyStatUpdateManyArgs>(args: SelectSubset<T, EnergyStatUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one EnergyStat.
     * @param {EnergyStatUpsertArgs} args - Arguments to update or create a EnergyStat.
     * @example
     * // Update or create a EnergyStat
     * const energyStat = await prisma.energyStat.upsert({
     *   create: {
     *     // ... data to create a EnergyStat
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EnergyStat we want to update
     *   }
     * })
     */
    upsert<T extends EnergyStatUpsertArgs>(args: SelectSubset<T, EnergyStatUpsertArgs<ExtArgs>>): Prisma__EnergyStatClient<$Result.GetResult<Prisma.$EnergyStatPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of EnergyStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnergyStatCountArgs} args - Arguments to filter EnergyStats to count.
     * @example
     * // Count the number of EnergyStats
     * const count = await prisma.energyStat.count({
     *   where: {
     *     // ... the filter for the EnergyStats we want to count
     *   }
     * })
    **/
    count<T extends EnergyStatCountArgs>(
      args?: Subset<T, EnergyStatCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EnergyStatCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EnergyStat.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnergyStatAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EnergyStatAggregateArgs>(args: Subset<T, EnergyStatAggregateArgs>): Prisma.PrismaPromise<GetEnergyStatAggregateType<T>>

    /**
     * Group by EnergyStat.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnergyStatGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EnergyStatGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EnergyStatGroupByArgs['orderBy'] }
        : { orderBy?: EnergyStatGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EnergyStatGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEnergyStatGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EnergyStat model
   */
  readonly fields: EnergyStatFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EnergyStat.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EnergyStatClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    property<T extends PropertyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PropertyDefaultArgs<ExtArgs>>): Prisma__PropertyClient<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the EnergyStat model
   */ 
  interface EnergyStatFieldRefs {
    readonly id: FieldRef<"EnergyStat", 'String'>
    readonly propertyId: FieldRef<"EnergyStat", 'String'>
    readonly date: FieldRef<"EnergyStat", 'DateTime'>
    readonly period: FieldRef<"EnergyStat", 'String'>
    readonly production: FieldRef<"EnergyStat", 'Float'>
    readonly consumption: FieldRef<"EnergyStat", 'Float'>
    readonly gridUsage: FieldRef<"EnergyStat", 'Float'>
    readonly batteryPercent: FieldRef<"EnergyStat", 'Float'>
    readonly solarKw: FieldRef<"EnergyStat", 'Float'>
    readonly gridKw: FieldRef<"EnergyStat", 'Float'>
    readonly exporting: FieldRef<"EnergyStat", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * EnergyStat findUnique
   */
  export type EnergyStatFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EnergyStat
     */
    select?: EnergyStatSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnergyStatInclude<ExtArgs> | null
    /**
     * Filter, which EnergyStat to fetch.
     */
    where: EnergyStatWhereUniqueInput
  }

  /**
   * EnergyStat findUniqueOrThrow
   */
  export type EnergyStatFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EnergyStat
     */
    select?: EnergyStatSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnergyStatInclude<ExtArgs> | null
    /**
     * Filter, which EnergyStat to fetch.
     */
    where: EnergyStatWhereUniqueInput
  }

  /**
   * EnergyStat findFirst
   */
  export type EnergyStatFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EnergyStat
     */
    select?: EnergyStatSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnergyStatInclude<ExtArgs> | null
    /**
     * Filter, which EnergyStat to fetch.
     */
    where?: EnergyStatWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EnergyStats to fetch.
     */
    orderBy?: EnergyStatOrderByWithRelationInput | EnergyStatOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EnergyStats.
     */
    cursor?: EnergyStatWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EnergyStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EnergyStats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EnergyStats.
     */
    distinct?: EnergyStatScalarFieldEnum | EnergyStatScalarFieldEnum[]
  }

  /**
   * EnergyStat findFirstOrThrow
   */
  export type EnergyStatFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EnergyStat
     */
    select?: EnergyStatSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnergyStatInclude<ExtArgs> | null
    /**
     * Filter, which EnergyStat to fetch.
     */
    where?: EnergyStatWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EnergyStats to fetch.
     */
    orderBy?: EnergyStatOrderByWithRelationInput | EnergyStatOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EnergyStats.
     */
    cursor?: EnergyStatWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EnergyStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EnergyStats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EnergyStats.
     */
    distinct?: EnergyStatScalarFieldEnum | EnergyStatScalarFieldEnum[]
  }

  /**
   * EnergyStat findMany
   */
  export type EnergyStatFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EnergyStat
     */
    select?: EnergyStatSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnergyStatInclude<ExtArgs> | null
    /**
     * Filter, which EnergyStats to fetch.
     */
    where?: EnergyStatWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EnergyStats to fetch.
     */
    orderBy?: EnergyStatOrderByWithRelationInput | EnergyStatOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EnergyStats.
     */
    cursor?: EnergyStatWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EnergyStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EnergyStats.
     */
    skip?: number
    distinct?: EnergyStatScalarFieldEnum | EnergyStatScalarFieldEnum[]
  }

  /**
   * EnergyStat create
   */
  export type EnergyStatCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EnergyStat
     */
    select?: EnergyStatSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnergyStatInclude<ExtArgs> | null
    /**
     * The data needed to create a EnergyStat.
     */
    data: XOR<EnergyStatCreateInput, EnergyStatUncheckedCreateInput>
  }

  /**
   * EnergyStat createMany
   */
  export type EnergyStatCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many EnergyStats.
     */
    data: EnergyStatCreateManyInput | EnergyStatCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EnergyStat createManyAndReturn
   */
  export type EnergyStatCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EnergyStat
     */
    select?: EnergyStatSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many EnergyStats.
     */
    data: EnergyStatCreateManyInput | EnergyStatCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnergyStatIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * EnergyStat update
   */
  export type EnergyStatUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EnergyStat
     */
    select?: EnergyStatSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnergyStatInclude<ExtArgs> | null
    /**
     * The data needed to update a EnergyStat.
     */
    data: XOR<EnergyStatUpdateInput, EnergyStatUncheckedUpdateInput>
    /**
     * Choose, which EnergyStat to update.
     */
    where: EnergyStatWhereUniqueInput
  }

  /**
   * EnergyStat updateMany
   */
  export type EnergyStatUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EnergyStats.
     */
    data: XOR<EnergyStatUpdateManyMutationInput, EnergyStatUncheckedUpdateManyInput>
    /**
     * Filter which EnergyStats to update
     */
    where?: EnergyStatWhereInput
  }

  /**
   * EnergyStat upsert
   */
  export type EnergyStatUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EnergyStat
     */
    select?: EnergyStatSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnergyStatInclude<ExtArgs> | null
    /**
     * The filter to search for the EnergyStat to update in case it exists.
     */
    where: EnergyStatWhereUniqueInput
    /**
     * In case the EnergyStat found by the `where` argument doesn't exist, create a new EnergyStat with this data.
     */
    create: XOR<EnergyStatCreateInput, EnergyStatUncheckedCreateInput>
    /**
     * In case the EnergyStat was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EnergyStatUpdateInput, EnergyStatUncheckedUpdateInput>
  }

  /**
   * EnergyStat delete
   */
  export type EnergyStatDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EnergyStat
     */
    select?: EnergyStatSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnergyStatInclude<ExtArgs> | null
    /**
     * Filter which EnergyStat to delete.
     */
    where: EnergyStatWhereUniqueInput
  }

  /**
   * EnergyStat deleteMany
   */
  export type EnergyStatDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EnergyStats to delete
     */
    where?: EnergyStatWhereInput
  }

  /**
   * EnergyStat without action
   */
  export type EnergyStatDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EnergyStat
     */
    select?: EnergyStatSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnergyStatInclude<ExtArgs> | null
  }


  /**
   * Model Notification
   */

  export type AggregateNotification = {
    _count: NotificationCountAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  export type NotificationMinAggregateOutputType = {
    id: string | null
    userId: string | null
    type: string | null
    title: string | null
    message: string | null
    route: string | null
    read: boolean | null
    dismissible: boolean | null
    persistent: boolean | null
    createdAt: Date | null
  }

  export type NotificationMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    type: string | null
    title: string | null
    message: string | null
    route: string | null
    read: boolean | null
    dismissible: boolean | null
    persistent: boolean | null
    createdAt: Date | null
  }

  export type NotificationCountAggregateOutputType = {
    id: number
    userId: number
    type: number
    title: number
    message: number
    route: number
    read: number
    dismissible: number
    persistent: number
    createdAt: number
    _all: number
  }


  export type NotificationMinAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    title?: true
    message?: true
    route?: true
    read?: true
    dismissible?: true
    persistent?: true
    createdAt?: true
  }

  export type NotificationMaxAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    title?: true
    message?: true
    route?: true
    read?: true
    dismissible?: true
    persistent?: true
    createdAt?: true
  }

  export type NotificationCountAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    title?: true
    message?: true
    route?: true
    read?: true
    dismissible?: true
    persistent?: true
    createdAt?: true
    _all?: true
  }

  export type NotificationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notification to aggregate.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Notifications
    **/
    _count?: true | NotificationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NotificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NotificationMaxAggregateInputType
  }

  export type GetNotificationAggregateType<T extends NotificationAggregateArgs> = {
        [P in keyof T & keyof AggregateNotification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNotification[P]>
      : GetScalarType<T[P], AggregateNotification[P]>
  }




  export type NotificationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationWhereInput
    orderBy?: NotificationOrderByWithAggregationInput | NotificationOrderByWithAggregationInput[]
    by: NotificationScalarFieldEnum[] | NotificationScalarFieldEnum
    having?: NotificationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NotificationCountAggregateInputType | true
    _min?: NotificationMinAggregateInputType
    _max?: NotificationMaxAggregateInputType
  }

  export type NotificationGroupByOutputType = {
    id: string
    userId: string
    type: string
    title: string
    message: string
    route: string | null
    read: boolean
    dismissible: boolean
    persistent: boolean
    createdAt: Date
    _count: NotificationCountAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  type GetNotificationGroupByPayload<T extends NotificationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NotificationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NotificationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NotificationGroupByOutputType[P]>
            : GetScalarType<T[P], NotificationGroupByOutputType[P]>
        }
      >
    >


  export type NotificationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    title?: boolean
    message?: boolean
    route?: boolean
    read?: boolean
    dismissible?: boolean
    persistent?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    title?: boolean
    message?: boolean
    route?: boolean
    read?: boolean
    dismissible?: boolean
    persistent?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectScalar = {
    id?: boolean
    userId?: boolean
    type?: boolean
    title?: boolean
    message?: boolean
    route?: boolean
    read?: boolean
    dismissible?: boolean
    persistent?: boolean
    createdAt?: boolean
  }

  export type NotificationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type NotificationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $NotificationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Notification"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      type: string
      title: string
      message: string
      route: string | null
      read: boolean
      dismissible: boolean
      persistent: boolean
      createdAt: Date
    }, ExtArgs["result"]["notification"]>
    composites: {}
  }

  type NotificationGetPayload<S extends boolean | null | undefined | NotificationDefaultArgs> = $Result.GetResult<Prisma.$NotificationPayload, S>

  type NotificationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<NotificationFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: NotificationCountAggregateInputType | true
    }

  export interface NotificationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Notification'], meta: { name: 'Notification' } }
    /**
     * Find zero or one Notification that matches the filter.
     * @param {NotificationFindUniqueArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NotificationFindUniqueArgs>(args: SelectSubset<T, NotificationFindUniqueArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Notification that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {NotificationFindUniqueOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NotificationFindUniqueOrThrowArgs>(args: SelectSubset<T, NotificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Notification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NotificationFindFirstArgs>(args?: SelectSubset<T, NotificationFindFirstArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Notification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NotificationFindFirstOrThrowArgs>(args?: SelectSubset<T, NotificationFindFirstOrThrowArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Notifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Notifications
     * const notifications = await prisma.notification.findMany()
     * 
     * // Get first 10 Notifications
     * const notifications = await prisma.notification.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const notificationWithIdOnly = await prisma.notification.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NotificationFindManyArgs>(args?: SelectSubset<T, NotificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Notification.
     * @param {NotificationCreateArgs} args - Arguments to create a Notification.
     * @example
     * // Create one Notification
     * const Notification = await prisma.notification.create({
     *   data: {
     *     // ... data to create a Notification
     *   }
     * })
     * 
     */
    create<T extends NotificationCreateArgs>(args: SelectSubset<T, NotificationCreateArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Notifications.
     * @param {NotificationCreateManyArgs} args - Arguments to create many Notifications.
     * @example
     * // Create many Notifications
     * const notification = await prisma.notification.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NotificationCreateManyArgs>(args?: SelectSubset<T, NotificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Notifications and returns the data saved in the database.
     * @param {NotificationCreateManyAndReturnArgs} args - Arguments to create many Notifications.
     * @example
     * // Create many Notifications
     * const notification = await prisma.notification.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Notifications and only return the `id`
     * const notificationWithIdOnly = await prisma.notification.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NotificationCreateManyAndReturnArgs>(args?: SelectSubset<T, NotificationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Notification.
     * @param {NotificationDeleteArgs} args - Arguments to delete one Notification.
     * @example
     * // Delete one Notification
     * const Notification = await prisma.notification.delete({
     *   where: {
     *     // ... filter to delete one Notification
     *   }
     * })
     * 
     */
    delete<T extends NotificationDeleteArgs>(args: SelectSubset<T, NotificationDeleteArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Notification.
     * @param {NotificationUpdateArgs} args - Arguments to update one Notification.
     * @example
     * // Update one Notification
     * const notification = await prisma.notification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NotificationUpdateArgs>(args: SelectSubset<T, NotificationUpdateArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Notifications.
     * @param {NotificationDeleteManyArgs} args - Arguments to filter Notifications to delete.
     * @example
     * // Delete a few Notifications
     * const { count } = await prisma.notification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NotificationDeleteManyArgs>(args?: SelectSubset<T, NotificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Notifications
     * const notification = await prisma.notification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NotificationUpdateManyArgs>(args: SelectSubset<T, NotificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Notification.
     * @param {NotificationUpsertArgs} args - Arguments to update or create a Notification.
     * @example
     * // Update or create a Notification
     * const notification = await prisma.notification.upsert({
     *   create: {
     *     // ... data to create a Notification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Notification we want to update
     *   }
     * })
     */
    upsert<T extends NotificationUpsertArgs>(args: SelectSubset<T, NotificationUpsertArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationCountArgs} args - Arguments to filter Notifications to count.
     * @example
     * // Count the number of Notifications
     * const count = await prisma.notification.count({
     *   where: {
     *     // ... the filter for the Notifications we want to count
     *   }
     * })
    **/
    count<T extends NotificationCountArgs>(
      args?: Subset<T, NotificationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NotificationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NotificationAggregateArgs>(args: Subset<T, NotificationAggregateArgs>): Prisma.PrismaPromise<GetNotificationAggregateType<T>>

    /**
     * Group by Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NotificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NotificationGroupByArgs['orderBy'] }
        : { orderBy?: NotificationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NotificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNotificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Notification model
   */
  readonly fields: NotificationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Notification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NotificationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Notification model
   */ 
  interface NotificationFieldRefs {
    readonly id: FieldRef<"Notification", 'String'>
    readonly userId: FieldRef<"Notification", 'String'>
    readonly type: FieldRef<"Notification", 'String'>
    readonly title: FieldRef<"Notification", 'String'>
    readonly message: FieldRef<"Notification", 'String'>
    readonly route: FieldRef<"Notification", 'String'>
    readonly read: FieldRef<"Notification", 'Boolean'>
    readonly dismissible: FieldRef<"Notification", 'Boolean'>
    readonly persistent: FieldRef<"Notification", 'Boolean'>
    readonly createdAt: FieldRef<"Notification", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Notification findUnique
   */
  export type NotificationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification findUniqueOrThrow
   */
  export type NotificationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification findFirst
   */
  export type NotificationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification findFirstOrThrow
   */
  export type NotificationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification findMany
   */
  export type NotificationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notifications to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification create
   */
  export type NotificationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The data needed to create a Notification.
     */
    data: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
  }

  /**
   * Notification createMany
   */
  export type NotificationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Notifications.
     */
    data: NotificationCreateManyInput | NotificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Notification createManyAndReturn
   */
  export type NotificationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Notifications.
     */
    data: NotificationCreateManyInput | NotificationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Notification update
   */
  export type NotificationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The data needed to update a Notification.
     */
    data: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
    /**
     * Choose, which Notification to update.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification updateMany
   */
  export type NotificationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Notifications.
     */
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyInput>
    /**
     * Filter which Notifications to update
     */
    where?: NotificationWhereInput
  }

  /**
   * Notification upsert
   */
  export type NotificationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The filter to search for the Notification to update in case it exists.
     */
    where: NotificationWhereUniqueInput
    /**
     * In case the Notification found by the `where` argument doesn't exist, create a new Notification with this data.
     */
    create: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
    /**
     * In case the Notification was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
  }

  /**
   * Notification delete
   */
  export type NotificationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter which Notification to delete.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification deleteMany
   */
  export type NotificationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notifications to delete
     */
    where?: NotificationWhereInput
  }

  /**
   * Notification without action
   */
  export type NotificationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
  }


  /**
   * Model Alert
   */

  export type AggregateAlert = {
    _count: AlertCountAggregateOutputType | null
    _min: AlertMinAggregateOutputType | null
    _max: AlertMaxAggregateOutputType | null
  }

  export type AlertMinAggregateOutputType = {
    id: string | null
    propertyId: string | null
    category: $Enums.AlertCategory | null
    severity: $Enums.AlertSeverity | null
    title: string | null
    message: string | null
    read: boolean | null
    createdAt: Date | null
  }

  export type AlertMaxAggregateOutputType = {
    id: string | null
    propertyId: string | null
    category: $Enums.AlertCategory | null
    severity: $Enums.AlertSeverity | null
    title: string | null
    message: string | null
    read: boolean | null
    createdAt: Date | null
  }

  export type AlertCountAggregateOutputType = {
    id: number
    propertyId: number
    category: number
    severity: number
    title: number
    message: number
    read: number
    createdAt: number
    _all: number
  }


  export type AlertMinAggregateInputType = {
    id?: true
    propertyId?: true
    category?: true
    severity?: true
    title?: true
    message?: true
    read?: true
    createdAt?: true
  }

  export type AlertMaxAggregateInputType = {
    id?: true
    propertyId?: true
    category?: true
    severity?: true
    title?: true
    message?: true
    read?: true
    createdAt?: true
  }

  export type AlertCountAggregateInputType = {
    id?: true
    propertyId?: true
    category?: true
    severity?: true
    title?: true
    message?: true
    read?: true
    createdAt?: true
    _all?: true
  }

  export type AlertAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Alert to aggregate.
     */
    where?: AlertWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Alerts to fetch.
     */
    orderBy?: AlertOrderByWithRelationInput | AlertOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AlertWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Alerts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Alerts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Alerts
    **/
    _count?: true | AlertCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AlertMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AlertMaxAggregateInputType
  }

  export type GetAlertAggregateType<T extends AlertAggregateArgs> = {
        [P in keyof T & keyof AggregateAlert]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAlert[P]>
      : GetScalarType<T[P], AggregateAlert[P]>
  }




  export type AlertGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AlertWhereInput
    orderBy?: AlertOrderByWithAggregationInput | AlertOrderByWithAggregationInput[]
    by: AlertScalarFieldEnum[] | AlertScalarFieldEnum
    having?: AlertScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AlertCountAggregateInputType | true
    _min?: AlertMinAggregateInputType
    _max?: AlertMaxAggregateInputType
  }

  export type AlertGroupByOutputType = {
    id: string
    propertyId: string
    category: $Enums.AlertCategory
    severity: $Enums.AlertSeverity
    title: string
    message: string
    read: boolean
    createdAt: Date
    _count: AlertCountAggregateOutputType | null
    _min: AlertMinAggregateOutputType | null
    _max: AlertMaxAggregateOutputType | null
  }

  type GetAlertGroupByPayload<T extends AlertGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AlertGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AlertGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AlertGroupByOutputType[P]>
            : GetScalarType<T[P], AlertGroupByOutputType[P]>
        }
      >
    >


  export type AlertSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    propertyId?: boolean
    category?: boolean
    severity?: boolean
    title?: boolean
    message?: boolean
    read?: boolean
    createdAt?: boolean
    property?: boolean | PropertyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["alert"]>

  export type AlertSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    propertyId?: boolean
    category?: boolean
    severity?: boolean
    title?: boolean
    message?: boolean
    read?: boolean
    createdAt?: boolean
    property?: boolean | PropertyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["alert"]>

  export type AlertSelectScalar = {
    id?: boolean
    propertyId?: boolean
    category?: boolean
    severity?: boolean
    title?: boolean
    message?: boolean
    read?: boolean
    createdAt?: boolean
  }

  export type AlertInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    property?: boolean | PropertyDefaultArgs<ExtArgs>
  }
  export type AlertIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    property?: boolean | PropertyDefaultArgs<ExtArgs>
  }

  export type $AlertPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Alert"
    objects: {
      property: Prisma.$PropertyPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      propertyId: string
      category: $Enums.AlertCategory
      severity: $Enums.AlertSeverity
      title: string
      message: string
      read: boolean
      createdAt: Date
    }, ExtArgs["result"]["alert"]>
    composites: {}
  }

  type AlertGetPayload<S extends boolean | null | undefined | AlertDefaultArgs> = $Result.GetResult<Prisma.$AlertPayload, S>

  type AlertCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AlertFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AlertCountAggregateInputType | true
    }

  export interface AlertDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Alert'], meta: { name: 'Alert' } }
    /**
     * Find zero or one Alert that matches the filter.
     * @param {AlertFindUniqueArgs} args - Arguments to find a Alert
     * @example
     * // Get one Alert
     * const alert = await prisma.alert.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AlertFindUniqueArgs>(args: SelectSubset<T, AlertFindUniqueArgs<ExtArgs>>): Prisma__AlertClient<$Result.GetResult<Prisma.$AlertPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Alert that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AlertFindUniqueOrThrowArgs} args - Arguments to find a Alert
     * @example
     * // Get one Alert
     * const alert = await prisma.alert.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AlertFindUniqueOrThrowArgs>(args: SelectSubset<T, AlertFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AlertClient<$Result.GetResult<Prisma.$AlertPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Alert that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertFindFirstArgs} args - Arguments to find a Alert
     * @example
     * // Get one Alert
     * const alert = await prisma.alert.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AlertFindFirstArgs>(args?: SelectSubset<T, AlertFindFirstArgs<ExtArgs>>): Prisma__AlertClient<$Result.GetResult<Prisma.$AlertPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Alert that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertFindFirstOrThrowArgs} args - Arguments to find a Alert
     * @example
     * // Get one Alert
     * const alert = await prisma.alert.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AlertFindFirstOrThrowArgs>(args?: SelectSubset<T, AlertFindFirstOrThrowArgs<ExtArgs>>): Prisma__AlertClient<$Result.GetResult<Prisma.$AlertPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Alerts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Alerts
     * const alerts = await prisma.alert.findMany()
     * 
     * // Get first 10 Alerts
     * const alerts = await prisma.alert.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const alertWithIdOnly = await prisma.alert.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AlertFindManyArgs>(args?: SelectSubset<T, AlertFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AlertPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Alert.
     * @param {AlertCreateArgs} args - Arguments to create a Alert.
     * @example
     * // Create one Alert
     * const Alert = await prisma.alert.create({
     *   data: {
     *     // ... data to create a Alert
     *   }
     * })
     * 
     */
    create<T extends AlertCreateArgs>(args: SelectSubset<T, AlertCreateArgs<ExtArgs>>): Prisma__AlertClient<$Result.GetResult<Prisma.$AlertPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Alerts.
     * @param {AlertCreateManyArgs} args - Arguments to create many Alerts.
     * @example
     * // Create many Alerts
     * const alert = await prisma.alert.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AlertCreateManyArgs>(args?: SelectSubset<T, AlertCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Alerts and returns the data saved in the database.
     * @param {AlertCreateManyAndReturnArgs} args - Arguments to create many Alerts.
     * @example
     * // Create many Alerts
     * const alert = await prisma.alert.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Alerts and only return the `id`
     * const alertWithIdOnly = await prisma.alert.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AlertCreateManyAndReturnArgs>(args?: SelectSubset<T, AlertCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AlertPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Alert.
     * @param {AlertDeleteArgs} args - Arguments to delete one Alert.
     * @example
     * // Delete one Alert
     * const Alert = await prisma.alert.delete({
     *   where: {
     *     // ... filter to delete one Alert
     *   }
     * })
     * 
     */
    delete<T extends AlertDeleteArgs>(args: SelectSubset<T, AlertDeleteArgs<ExtArgs>>): Prisma__AlertClient<$Result.GetResult<Prisma.$AlertPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Alert.
     * @param {AlertUpdateArgs} args - Arguments to update one Alert.
     * @example
     * // Update one Alert
     * const alert = await prisma.alert.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AlertUpdateArgs>(args: SelectSubset<T, AlertUpdateArgs<ExtArgs>>): Prisma__AlertClient<$Result.GetResult<Prisma.$AlertPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Alerts.
     * @param {AlertDeleteManyArgs} args - Arguments to filter Alerts to delete.
     * @example
     * // Delete a few Alerts
     * const { count } = await prisma.alert.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AlertDeleteManyArgs>(args?: SelectSubset<T, AlertDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Alerts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Alerts
     * const alert = await prisma.alert.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AlertUpdateManyArgs>(args: SelectSubset<T, AlertUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Alert.
     * @param {AlertUpsertArgs} args - Arguments to update or create a Alert.
     * @example
     * // Update or create a Alert
     * const alert = await prisma.alert.upsert({
     *   create: {
     *     // ... data to create a Alert
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Alert we want to update
     *   }
     * })
     */
    upsert<T extends AlertUpsertArgs>(args: SelectSubset<T, AlertUpsertArgs<ExtArgs>>): Prisma__AlertClient<$Result.GetResult<Prisma.$AlertPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Alerts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertCountArgs} args - Arguments to filter Alerts to count.
     * @example
     * // Count the number of Alerts
     * const count = await prisma.alert.count({
     *   where: {
     *     // ... the filter for the Alerts we want to count
     *   }
     * })
    **/
    count<T extends AlertCountArgs>(
      args?: Subset<T, AlertCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AlertCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Alert.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AlertAggregateArgs>(args: Subset<T, AlertAggregateArgs>): Prisma.PrismaPromise<GetAlertAggregateType<T>>

    /**
     * Group by Alert.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AlertGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AlertGroupByArgs['orderBy'] }
        : { orderBy?: AlertGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AlertGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAlertGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Alert model
   */
  readonly fields: AlertFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Alert.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AlertClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    property<T extends PropertyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PropertyDefaultArgs<ExtArgs>>): Prisma__PropertyClient<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Alert model
   */ 
  interface AlertFieldRefs {
    readonly id: FieldRef<"Alert", 'String'>
    readonly propertyId: FieldRef<"Alert", 'String'>
    readonly category: FieldRef<"Alert", 'AlertCategory'>
    readonly severity: FieldRef<"Alert", 'AlertSeverity'>
    readonly title: FieldRef<"Alert", 'String'>
    readonly message: FieldRef<"Alert", 'String'>
    readonly read: FieldRef<"Alert", 'Boolean'>
    readonly createdAt: FieldRef<"Alert", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Alert findUnique
   */
  export type AlertFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alert
     */
    select?: AlertSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlertInclude<ExtArgs> | null
    /**
     * Filter, which Alert to fetch.
     */
    where: AlertWhereUniqueInput
  }

  /**
   * Alert findUniqueOrThrow
   */
  export type AlertFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alert
     */
    select?: AlertSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlertInclude<ExtArgs> | null
    /**
     * Filter, which Alert to fetch.
     */
    where: AlertWhereUniqueInput
  }

  /**
   * Alert findFirst
   */
  export type AlertFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alert
     */
    select?: AlertSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlertInclude<ExtArgs> | null
    /**
     * Filter, which Alert to fetch.
     */
    where?: AlertWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Alerts to fetch.
     */
    orderBy?: AlertOrderByWithRelationInput | AlertOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Alerts.
     */
    cursor?: AlertWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Alerts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Alerts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Alerts.
     */
    distinct?: AlertScalarFieldEnum | AlertScalarFieldEnum[]
  }

  /**
   * Alert findFirstOrThrow
   */
  export type AlertFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alert
     */
    select?: AlertSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlertInclude<ExtArgs> | null
    /**
     * Filter, which Alert to fetch.
     */
    where?: AlertWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Alerts to fetch.
     */
    orderBy?: AlertOrderByWithRelationInput | AlertOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Alerts.
     */
    cursor?: AlertWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Alerts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Alerts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Alerts.
     */
    distinct?: AlertScalarFieldEnum | AlertScalarFieldEnum[]
  }

  /**
   * Alert findMany
   */
  export type AlertFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alert
     */
    select?: AlertSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlertInclude<ExtArgs> | null
    /**
     * Filter, which Alerts to fetch.
     */
    where?: AlertWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Alerts to fetch.
     */
    orderBy?: AlertOrderByWithRelationInput | AlertOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Alerts.
     */
    cursor?: AlertWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Alerts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Alerts.
     */
    skip?: number
    distinct?: AlertScalarFieldEnum | AlertScalarFieldEnum[]
  }

  /**
   * Alert create
   */
  export type AlertCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alert
     */
    select?: AlertSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlertInclude<ExtArgs> | null
    /**
     * The data needed to create a Alert.
     */
    data: XOR<AlertCreateInput, AlertUncheckedCreateInput>
  }

  /**
   * Alert createMany
   */
  export type AlertCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Alerts.
     */
    data: AlertCreateManyInput | AlertCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Alert createManyAndReturn
   */
  export type AlertCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alert
     */
    select?: AlertSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Alerts.
     */
    data: AlertCreateManyInput | AlertCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlertIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Alert update
   */
  export type AlertUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alert
     */
    select?: AlertSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlertInclude<ExtArgs> | null
    /**
     * The data needed to update a Alert.
     */
    data: XOR<AlertUpdateInput, AlertUncheckedUpdateInput>
    /**
     * Choose, which Alert to update.
     */
    where: AlertWhereUniqueInput
  }

  /**
   * Alert updateMany
   */
  export type AlertUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Alerts.
     */
    data: XOR<AlertUpdateManyMutationInput, AlertUncheckedUpdateManyInput>
    /**
     * Filter which Alerts to update
     */
    where?: AlertWhereInput
  }

  /**
   * Alert upsert
   */
  export type AlertUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alert
     */
    select?: AlertSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlertInclude<ExtArgs> | null
    /**
     * The filter to search for the Alert to update in case it exists.
     */
    where: AlertWhereUniqueInput
    /**
     * In case the Alert found by the `where` argument doesn't exist, create a new Alert with this data.
     */
    create: XOR<AlertCreateInput, AlertUncheckedCreateInput>
    /**
     * In case the Alert was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AlertUpdateInput, AlertUncheckedUpdateInput>
  }

  /**
   * Alert delete
   */
  export type AlertDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alert
     */
    select?: AlertSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlertInclude<ExtArgs> | null
    /**
     * Filter which Alert to delete.
     */
    where: AlertWhereUniqueInput
  }

  /**
   * Alert deleteMany
   */
  export type AlertDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Alerts to delete
     */
    where?: AlertWhereInput
  }

  /**
   * Alert without action
   */
  export type AlertDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alert
     */
    select?: AlertSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlertInclude<ExtArgs> | null
  }


  /**
   * Model Bill
   */

  export type AggregateBill = {
    _count: BillCountAggregateOutputType | null
    _avg: BillAvgAggregateOutputType | null
    _sum: BillSumAggregateOutputType | null
    _min: BillMinAggregateOutputType | null
    _max: BillMaxAggregateOutputType | null
  }

  export type BillAvgAggregateOutputType = {
    totalAmount: number | null
    subscriptionFee: number | null
    usageCharge: number | null
    taxes: number | null
  }

  export type BillSumAggregateOutputType = {
    totalAmount: number | null
    subscriptionFee: number | null
    usageCharge: number | null
    taxes: number | null
  }

  export type BillMinAggregateOutputType = {
    id: string | null
    propertyId: string | null
    month: string | null
    totalAmount: number | null
    subscriptionFee: number | null
    usageCharge: number | null
    taxes: number | null
    status: $Enums.BillStatus | null
    dueDate: Date | null
    generatedAt: Date | null
    paidDate: Date | null
    pdfUrl: string | null
  }

  export type BillMaxAggregateOutputType = {
    id: string | null
    propertyId: string | null
    month: string | null
    totalAmount: number | null
    subscriptionFee: number | null
    usageCharge: number | null
    taxes: number | null
    status: $Enums.BillStatus | null
    dueDate: Date | null
    generatedAt: Date | null
    paidDate: Date | null
    pdfUrl: string | null
  }

  export type BillCountAggregateOutputType = {
    id: number
    propertyId: number
    month: number
    totalAmount: number
    subscriptionFee: number
    usageCharge: number
    taxes: number
    status: number
    dueDate: number
    generatedAt: number
    paidDate: number
    pdfUrl: number
    _all: number
  }


  export type BillAvgAggregateInputType = {
    totalAmount?: true
    subscriptionFee?: true
    usageCharge?: true
    taxes?: true
  }

  export type BillSumAggregateInputType = {
    totalAmount?: true
    subscriptionFee?: true
    usageCharge?: true
    taxes?: true
  }

  export type BillMinAggregateInputType = {
    id?: true
    propertyId?: true
    month?: true
    totalAmount?: true
    subscriptionFee?: true
    usageCharge?: true
    taxes?: true
    status?: true
    dueDate?: true
    generatedAt?: true
    paidDate?: true
    pdfUrl?: true
  }

  export type BillMaxAggregateInputType = {
    id?: true
    propertyId?: true
    month?: true
    totalAmount?: true
    subscriptionFee?: true
    usageCharge?: true
    taxes?: true
    status?: true
    dueDate?: true
    generatedAt?: true
    paidDate?: true
    pdfUrl?: true
  }

  export type BillCountAggregateInputType = {
    id?: true
    propertyId?: true
    month?: true
    totalAmount?: true
    subscriptionFee?: true
    usageCharge?: true
    taxes?: true
    status?: true
    dueDate?: true
    generatedAt?: true
    paidDate?: true
    pdfUrl?: true
    _all?: true
  }

  export type BillAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Bill to aggregate.
     */
    where?: BillWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bills to fetch.
     */
    orderBy?: BillOrderByWithRelationInput | BillOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BillWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bills from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bills.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Bills
    **/
    _count?: true | BillCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BillAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BillSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BillMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BillMaxAggregateInputType
  }

  export type GetBillAggregateType<T extends BillAggregateArgs> = {
        [P in keyof T & keyof AggregateBill]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBill[P]>
      : GetScalarType<T[P], AggregateBill[P]>
  }




  export type BillGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BillWhereInput
    orderBy?: BillOrderByWithAggregationInput | BillOrderByWithAggregationInput[]
    by: BillScalarFieldEnum[] | BillScalarFieldEnum
    having?: BillScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BillCountAggregateInputType | true
    _avg?: BillAvgAggregateInputType
    _sum?: BillSumAggregateInputType
    _min?: BillMinAggregateInputType
    _max?: BillMaxAggregateInputType
  }

  export type BillGroupByOutputType = {
    id: string
    propertyId: string
    month: string
    totalAmount: number
    subscriptionFee: number
    usageCharge: number
    taxes: number
    status: $Enums.BillStatus
    dueDate: Date
    generatedAt: Date
    paidDate: Date | null
    pdfUrl: string | null
    _count: BillCountAggregateOutputType | null
    _avg: BillAvgAggregateOutputType | null
    _sum: BillSumAggregateOutputType | null
    _min: BillMinAggregateOutputType | null
    _max: BillMaxAggregateOutputType | null
  }

  type GetBillGroupByPayload<T extends BillGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BillGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BillGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BillGroupByOutputType[P]>
            : GetScalarType<T[P], BillGroupByOutputType[P]>
        }
      >
    >


  export type BillSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    propertyId?: boolean
    month?: boolean
    totalAmount?: boolean
    subscriptionFee?: boolean
    usageCharge?: boolean
    taxes?: boolean
    status?: boolean
    dueDate?: boolean
    generatedAt?: boolean
    paidDate?: boolean
    pdfUrl?: boolean
    property?: boolean | PropertyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bill"]>

  export type BillSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    propertyId?: boolean
    month?: boolean
    totalAmount?: boolean
    subscriptionFee?: boolean
    usageCharge?: boolean
    taxes?: boolean
    status?: boolean
    dueDate?: boolean
    generatedAt?: boolean
    paidDate?: boolean
    pdfUrl?: boolean
    property?: boolean | PropertyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bill"]>

  export type BillSelectScalar = {
    id?: boolean
    propertyId?: boolean
    month?: boolean
    totalAmount?: boolean
    subscriptionFee?: boolean
    usageCharge?: boolean
    taxes?: boolean
    status?: boolean
    dueDate?: boolean
    generatedAt?: boolean
    paidDate?: boolean
    pdfUrl?: boolean
  }

  export type BillInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    property?: boolean | PropertyDefaultArgs<ExtArgs>
  }
  export type BillIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    property?: boolean | PropertyDefaultArgs<ExtArgs>
  }

  export type $BillPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Bill"
    objects: {
      property: Prisma.$PropertyPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      propertyId: string
      month: string
      totalAmount: number
      subscriptionFee: number
      usageCharge: number
      taxes: number
      status: $Enums.BillStatus
      dueDate: Date
      generatedAt: Date
      paidDate: Date | null
      pdfUrl: string | null
    }, ExtArgs["result"]["bill"]>
    composites: {}
  }

  type BillGetPayload<S extends boolean | null | undefined | BillDefaultArgs> = $Result.GetResult<Prisma.$BillPayload, S>

  type BillCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<BillFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: BillCountAggregateInputType | true
    }

  export interface BillDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Bill'], meta: { name: 'Bill' } }
    /**
     * Find zero or one Bill that matches the filter.
     * @param {BillFindUniqueArgs} args - Arguments to find a Bill
     * @example
     * // Get one Bill
     * const bill = await prisma.bill.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BillFindUniqueArgs>(args: SelectSubset<T, BillFindUniqueArgs<ExtArgs>>): Prisma__BillClient<$Result.GetResult<Prisma.$BillPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Bill that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {BillFindUniqueOrThrowArgs} args - Arguments to find a Bill
     * @example
     * // Get one Bill
     * const bill = await prisma.bill.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BillFindUniqueOrThrowArgs>(args: SelectSubset<T, BillFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BillClient<$Result.GetResult<Prisma.$BillPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Bill that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BillFindFirstArgs} args - Arguments to find a Bill
     * @example
     * // Get one Bill
     * const bill = await prisma.bill.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BillFindFirstArgs>(args?: SelectSubset<T, BillFindFirstArgs<ExtArgs>>): Prisma__BillClient<$Result.GetResult<Prisma.$BillPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Bill that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BillFindFirstOrThrowArgs} args - Arguments to find a Bill
     * @example
     * // Get one Bill
     * const bill = await prisma.bill.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BillFindFirstOrThrowArgs>(args?: SelectSubset<T, BillFindFirstOrThrowArgs<ExtArgs>>): Prisma__BillClient<$Result.GetResult<Prisma.$BillPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Bills that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BillFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Bills
     * const bills = await prisma.bill.findMany()
     * 
     * // Get first 10 Bills
     * const bills = await prisma.bill.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const billWithIdOnly = await prisma.bill.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BillFindManyArgs>(args?: SelectSubset<T, BillFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BillPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Bill.
     * @param {BillCreateArgs} args - Arguments to create a Bill.
     * @example
     * // Create one Bill
     * const Bill = await prisma.bill.create({
     *   data: {
     *     // ... data to create a Bill
     *   }
     * })
     * 
     */
    create<T extends BillCreateArgs>(args: SelectSubset<T, BillCreateArgs<ExtArgs>>): Prisma__BillClient<$Result.GetResult<Prisma.$BillPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Bills.
     * @param {BillCreateManyArgs} args - Arguments to create many Bills.
     * @example
     * // Create many Bills
     * const bill = await prisma.bill.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BillCreateManyArgs>(args?: SelectSubset<T, BillCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Bills and returns the data saved in the database.
     * @param {BillCreateManyAndReturnArgs} args - Arguments to create many Bills.
     * @example
     * // Create many Bills
     * const bill = await prisma.bill.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Bills and only return the `id`
     * const billWithIdOnly = await prisma.bill.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BillCreateManyAndReturnArgs>(args?: SelectSubset<T, BillCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BillPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Bill.
     * @param {BillDeleteArgs} args - Arguments to delete one Bill.
     * @example
     * // Delete one Bill
     * const Bill = await prisma.bill.delete({
     *   where: {
     *     // ... filter to delete one Bill
     *   }
     * })
     * 
     */
    delete<T extends BillDeleteArgs>(args: SelectSubset<T, BillDeleteArgs<ExtArgs>>): Prisma__BillClient<$Result.GetResult<Prisma.$BillPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Bill.
     * @param {BillUpdateArgs} args - Arguments to update one Bill.
     * @example
     * // Update one Bill
     * const bill = await prisma.bill.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BillUpdateArgs>(args: SelectSubset<T, BillUpdateArgs<ExtArgs>>): Prisma__BillClient<$Result.GetResult<Prisma.$BillPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Bills.
     * @param {BillDeleteManyArgs} args - Arguments to filter Bills to delete.
     * @example
     * // Delete a few Bills
     * const { count } = await prisma.bill.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BillDeleteManyArgs>(args?: SelectSubset<T, BillDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Bills.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BillUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Bills
     * const bill = await prisma.bill.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BillUpdateManyArgs>(args: SelectSubset<T, BillUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Bill.
     * @param {BillUpsertArgs} args - Arguments to update or create a Bill.
     * @example
     * // Update or create a Bill
     * const bill = await prisma.bill.upsert({
     *   create: {
     *     // ... data to create a Bill
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Bill we want to update
     *   }
     * })
     */
    upsert<T extends BillUpsertArgs>(args: SelectSubset<T, BillUpsertArgs<ExtArgs>>): Prisma__BillClient<$Result.GetResult<Prisma.$BillPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Bills.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BillCountArgs} args - Arguments to filter Bills to count.
     * @example
     * // Count the number of Bills
     * const count = await prisma.bill.count({
     *   where: {
     *     // ... the filter for the Bills we want to count
     *   }
     * })
    **/
    count<T extends BillCountArgs>(
      args?: Subset<T, BillCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BillCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Bill.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BillAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BillAggregateArgs>(args: Subset<T, BillAggregateArgs>): Prisma.PrismaPromise<GetBillAggregateType<T>>

    /**
     * Group by Bill.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BillGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BillGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BillGroupByArgs['orderBy'] }
        : { orderBy?: BillGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BillGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBillGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Bill model
   */
  readonly fields: BillFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Bill.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BillClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    property<T extends PropertyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PropertyDefaultArgs<ExtArgs>>): Prisma__PropertyClient<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Bill model
   */ 
  interface BillFieldRefs {
    readonly id: FieldRef<"Bill", 'String'>
    readonly propertyId: FieldRef<"Bill", 'String'>
    readonly month: FieldRef<"Bill", 'String'>
    readonly totalAmount: FieldRef<"Bill", 'Float'>
    readonly subscriptionFee: FieldRef<"Bill", 'Float'>
    readonly usageCharge: FieldRef<"Bill", 'Float'>
    readonly taxes: FieldRef<"Bill", 'Float'>
    readonly status: FieldRef<"Bill", 'BillStatus'>
    readonly dueDate: FieldRef<"Bill", 'DateTime'>
    readonly generatedAt: FieldRef<"Bill", 'DateTime'>
    readonly paidDate: FieldRef<"Bill", 'DateTime'>
    readonly pdfUrl: FieldRef<"Bill", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Bill findUnique
   */
  export type BillFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bill
     */
    select?: BillSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillInclude<ExtArgs> | null
    /**
     * Filter, which Bill to fetch.
     */
    where: BillWhereUniqueInput
  }

  /**
   * Bill findUniqueOrThrow
   */
  export type BillFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bill
     */
    select?: BillSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillInclude<ExtArgs> | null
    /**
     * Filter, which Bill to fetch.
     */
    where: BillWhereUniqueInput
  }

  /**
   * Bill findFirst
   */
  export type BillFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bill
     */
    select?: BillSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillInclude<ExtArgs> | null
    /**
     * Filter, which Bill to fetch.
     */
    where?: BillWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bills to fetch.
     */
    orderBy?: BillOrderByWithRelationInput | BillOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Bills.
     */
    cursor?: BillWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bills from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bills.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Bills.
     */
    distinct?: BillScalarFieldEnum | BillScalarFieldEnum[]
  }

  /**
   * Bill findFirstOrThrow
   */
  export type BillFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bill
     */
    select?: BillSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillInclude<ExtArgs> | null
    /**
     * Filter, which Bill to fetch.
     */
    where?: BillWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bills to fetch.
     */
    orderBy?: BillOrderByWithRelationInput | BillOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Bills.
     */
    cursor?: BillWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bills from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bills.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Bills.
     */
    distinct?: BillScalarFieldEnum | BillScalarFieldEnum[]
  }

  /**
   * Bill findMany
   */
  export type BillFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bill
     */
    select?: BillSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillInclude<ExtArgs> | null
    /**
     * Filter, which Bills to fetch.
     */
    where?: BillWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bills to fetch.
     */
    orderBy?: BillOrderByWithRelationInput | BillOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Bills.
     */
    cursor?: BillWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bills from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bills.
     */
    skip?: number
    distinct?: BillScalarFieldEnum | BillScalarFieldEnum[]
  }

  /**
   * Bill create
   */
  export type BillCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bill
     */
    select?: BillSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillInclude<ExtArgs> | null
    /**
     * The data needed to create a Bill.
     */
    data: XOR<BillCreateInput, BillUncheckedCreateInput>
  }

  /**
   * Bill createMany
   */
  export type BillCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Bills.
     */
    data: BillCreateManyInput | BillCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Bill createManyAndReturn
   */
  export type BillCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bill
     */
    select?: BillSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Bills.
     */
    data: BillCreateManyInput | BillCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Bill update
   */
  export type BillUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bill
     */
    select?: BillSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillInclude<ExtArgs> | null
    /**
     * The data needed to update a Bill.
     */
    data: XOR<BillUpdateInput, BillUncheckedUpdateInput>
    /**
     * Choose, which Bill to update.
     */
    where: BillWhereUniqueInput
  }

  /**
   * Bill updateMany
   */
  export type BillUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Bills.
     */
    data: XOR<BillUpdateManyMutationInput, BillUncheckedUpdateManyInput>
    /**
     * Filter which Bills to update
     */
    where?: BillWhereInput
  }

  /**
   * Bill upsert
   */
  export type BillUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bill
     */
    select?: BillSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillInclude<ExtArgs> | null
    /**
     * The filter to search for the Bill to update in case it exists.
     */
    where: BillWhereUniqueInput
    /**
     * In case the Bill found by the `where` argument doesn't exist, create a new Bill with this data.
     */
    create: XOR<BillCreateInput, BillUncheckedCreateInput>
    /**
     * In case the Bill was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BillUpdateInput, BillUncheckedUpdateInput>
  }

  /**
   * Bill delete
   */
  export type BillDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bill
     */
    select?: BillSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillInclude<ExtArgs> | null
    /**
     * Filter which Bill to delete.
     */
    where: BillWhereUniqueInput
  }

  /**
   * Bill deleteMany
   */
  export type BillDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Bills to delete
     */
    where?: BillWhereInput
  }

  /**
   * Bill without action
   */
  export type BillDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bill
     */
    select?: BillSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillInclude<ExtArgs> | null
  }


  /**
   * Model SupportTicket
   */

  export type AggregateSupportTicket = {
    _count: SupportTicketCountAggregateOutputType | null
    _min: SupportTicketMinAggregateOutputType | null
    _max: SupportTicketMaxAggregateOutputType | null
  }

  export type SupportTicketMinAggregateOutputType = {
    id: string | null
    userId: string | null
    propertyId: string | null
    category: $Enums.TicketCategory | null
    priority: $Enums.TicketPriority | null
    status: $Enums.TicketStatus | null
    title: string | null
    description: string | null
    estimatedResponse: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SupportTicketMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    propertyId: string | null
    category: $Enums.TicketCategory | null
    priority: $Enums.TicketPriority | null
    status: $Enums.TicketStatus | null
    title: string | null
    description: string | null
    estimatedResponse: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SupportTicketCountAggregateOutputType = {
    id: number
    userId: number
    propertyId: number
    category: number
    priority: number
    status: number
    title: number
    description: number
    estimatedResponse: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SupportTicketMinAggregateInputType = {
    id?: true
    userId?: true
    propertyId?: true
    category?: true
    priority?: true
    status?: true
    title?: true
    description?: true
    estimatedResponse?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SupportTicketMaxAggregateInputType = {
    id?: true
    userId?: true
    propertyId?: true
    category?: true
    priority?: true
    status?: true
    title?: true
    description?: true
    estimatedResponse?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SupportTicketCountAggregateInputType = {
    id?: true
    userId?: true
    propertyId?: true
    category?: true
    priority?: true
    status?: true
    title?: true
    description?: true
    estimatedResponse?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SupportTicketAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SupportTicket to aggregate.
     */
    where?: SupportTicketWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SupportTickets to fetch.
     */
    orderBy?: SupportTicketOrderByWithRelationInput | SupportTicketOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SupportTicketWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SupportTickets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SupportTickets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SupportTickets
    **/
    _count?: true | SupportTicketCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SupportTicketMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SupportTicketMaxAggregateInputType
  }

  export type GetSupportTicketAggregateType<T extends SupportTicketAggregateArgs> = {
        [P in keyof T & keyof AggregateSupportTicket]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSupportTicket[P]>
      : GetScalarType<T[P], AggregateSupportTicket[P]>
  }




  export type SupportTicketGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SupportTicketWhereInput
    orderBy?: SupportTicketOrderByWithAggregationInput | SupportTicketOrderByWithAggregationInput[]
    by: SupportTicketScalarFieldEnum[] | SupportTicketScalarFieldEnum
    having?: SupportTicketScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SupportTicketCountAggregateInputType | true
    _min?: SupportTicketMinAggregateInputType
    _max?: SupportTicketMaxAggregateInputType
  }

  export type SupportTicketGroupByOutputType = {
    id: string
    userId: string
    propertyId: string
    category: $Enums.TicketCategory
    priority: $Enums.TicketPriority
    status: $Enums.TicketStatus
    title: string
    description: string
    estimatedResponse: string | null
    createdAt: Date
    updatedAt: Date
    _count: SupportTicketCountAggregateOutputType | null
    _min: SupportTicketMinAggregateOutputType | null
    _max: SupportTicketMaxAggregateOutputType | null
  }

  type GetSupportTicketGroupByPayload<T extends SupportTicketGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SupportTicketGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SupportTicketGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SupportTicketGroupByOutputType[P]>
            : GetScalarType<T[P], SupportTicketGroupByOutputType[P]>
        }
      >
    >


  export type SupportTicketSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    propertyId?: boolean
    category?: boolean
    priority?: boolean
    status?: boolean
    title?: boolean
    description?: boolean
    estimatedResponse?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    property?: boolean | PropertyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["supportTicket"]>

  export type SupportTicketSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    propertyId?: boolean
    category?: boolean
    priority?: boolean
    status?: boolean
    title?: boolean
    description?: boolean
    estimatedResponse?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    property?: boolean | PropertyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["supportTicket"]>

  export type SupportTicketSelectScalar = {
    id?: boolean
    userId?: boolean
    propertyId?: boolean
    category?: boolean
    priority?: boolean
    status?: boolean
    title?: boolean
    description?: boolean
    estimatedResponse?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SupportTicketInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    property?: boolean | PropertyDefaultArgs<ExtArgs>
  }
  export type SupportTicketIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    property?: boolean | PropertyDefaultArgs<ExtArgs>
  }

  export type $SupportTicketPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SupportTicket"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      property: Prisma.$PropertyPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      propertyId: string
      category: $Enums.TicketCategory
      priority: $Enums.TicketPriority
      status: $Enums.TicketStatus
      title: string
      description: string
      estimatedResponse: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["supportTicket"]>
    composites: {}
  }

  type SupportTicketGetPayload<S extends boolean | null | undefined | SupportTicketDefaultArgs> = $Result.GetResult<Prisma.$SupportTicketPayload, S>

  type SupportTicketCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SupportTicketFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SupportTicketCountAggregateInputType | true
    }

  export interface SupportTicketDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SupportTicket'], meta: { name: 'SupportTicket' } }
    /**
     * Find zero or one SupportTicket that matches the filter.
     * @param {SupportTicketFindUniqueArgs} args - Arguments to find a SupportTicket
     * @example
     * // Get one SupportTicket
     * const supportTicket = await prisma.supportTicket.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SupportTicketFindUniqueArgs>(args: SelectSubset<T, SupportTicketFindUniqueArgs<ExtArgs>>): Prisma__SupportTicketClient<$Result.GetResult<Prisma.$SupportTicketPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one SupportTicket that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {SupportTicketFindUniqueOrThrowArgs} args - Arguments to find a SupportTicket
     * @example
     * // Get one SupportTicket
     * const supportTicket = await prisma.supportTicket.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SupportTicketFindUniqueOrThrowArgs>(args: SelectSubset<T, SupportTicketFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SupportTicketClient<$Result.GetResult<Prisma.$SupportTicketPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first SupportTicket that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupportTicketFindFirstArgs} args - Arguments to find a SupportTicket
     * @example
     * // Get one SupportTicket
     * const supportTicket = await prisma.supportTicket.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SupportTicketFindFirstArgs>(args?: SelectSubset<T, SupportTicketFindFirstArgs<ExtArgs>>): Prisma__SupportTicketClient<$Result.GetResult<Prisma.$SupportTicketPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first SupportTicket that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupportTicketFindFirstOrThrowArgs} args - Arguments to find a SupportTicket
     * @example
     * // Get one SupportTicket
     * const supportTicket = await prisma.supportTicket.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SupportTicketFindFirstOrThrowArgs>(args?: SelectSubset<T, SupportTicketFindFirstOrThrowArgs<ExtArgs>>): Prisma__SupportTicketClient<$Result.GetResult<Prisma.$SupportTicketPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more SupportTickets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupportTicketFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SupportTickets
     * const supportTickets = await prisma.supportTicket.findMany()
     * 
     * // Get first 10 SupportTickets
     * const supportTickets = await prisma.supportTicket.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const supportTicketWithIdOnly = await prisma.supportTicket.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SupportTicketFindManyArgs>(args?: SelectSubset<T, SupportTicketFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SupportTicketPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a SupportTicket.
     * @param {SupportTicketCreateArgs} args - Arguments to create a SupportTicket.
     * @example
     * // Create one SupportTicket
     * const SupportTicket = await prisma.supportTicket.create({
     *   data: {
     *     // ... data to create a SupportTicket
     *   }
     * })
     * 
     */
    create<T extends SupportTicketCreateArgs>(args: SelectSubset<T, SupportTicketCreateArgs<ExtArgs>>): Prisma__SupportTicketClient<$Result.GetResult<Prisma.$SupportTicketPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many SupportTickets.
     * @param {SupportTicketCreateManyArgs} args - Arguments to create many SupportTickets.
     * @example
     * // Create many SupportTickets
     * const supportTicket = await prisma.supportTicket.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SupportTicketCreateManyArgs>(args?: SelectSubset<T, SupportTicketCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SupportTickets and returns the data saved in the database.
     * @param {SupportTicketCreateManyAndReturnArgs} args - Arguments to create many SupportTickets.
     * @example
     * // Create many SupportTickets
     * const supportTicket = await prisma.supportTicket.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SupportTickets and only return the `id`
     * const supportTicketWithIdOnly = await prisma.supportTicket.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SupportTicketCreateManyAndReturnArgs>(args?: SelectSubset<T, SupportTicketCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SupportTicketPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a SupportTicket.
     * @param {SupportTicketDeleteArgs} args - Arguments to delete one SupportTicket.
     * @example
     * // Delete one SupportTicket
     * const SupportTicket = await prisma.supportTicket.delete({
     *   where: {
     *     // ... filter to delete one SupportTicket
     *   }
     * })
     * 
     */
    delete<T extends SupportTicketDeleteArgs>(args: SelectSubset<T, SupportTicketDeleteArgs<ExtArgs>>): Prisma__SupportTicketClient<$Result.GetResult<Prisma.$SupportTicketPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one SupportTicket.
     * @param {SupportTicketUpdateArgs} args - Arguments to update one SupportTicket.
     * @example
     * // Update one SupportTicket
     * const supportTicket = await prisma.supportTicket.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SupportTicketUpdateArgs>(args: SelectSubset<T, SupportTicketUpdateArgs<ExtArgs>>): Prisma__SupportTicketClient<$Result.GetResult<Prisma.$SupportTicketPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more SupportTickets.
     * @param {SupportTicketDeleteManyArgs} args - Arguments to filter SupportTickets to delete.
     * @example
     * // Delete a few SupportTickets
     * const { count } = await prisma.supportTicket.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SupportTicketDeleteManyArgs>(args?: SelectSubset<T, SupportTicketDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SupportTickets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupportTicketUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SupportTickets
     * const supportTicket = await prisma.supportTicket.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SupportTicketUpdateManyArgs>(args: SelectSubset<T, SupportTicketUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one SupportTicket.
     * @param {SupportTicketUpsertArgs} args - Arguments to update or create a SupportTicket.
     * @example
     * // Update or create a SupportTicket
     * const supportTicket = await prisma.supportTicket.upsert({
     *   create: {
     *     // ... data to create a SupportTicket
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SupportTicket we want to update
     *   }
     * })
     */
    upsert<T extends SupportTicketUpsertArgs>(args: SelectSubset<T, SupportTicketUpsertArgs<ExtArgs>>): Prisma__SupportTicketClient<$Result.GetResult<Prisma.$SupportTicketPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of SupportTickets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupportTicketCountArgs} args - Arguments to filter SupportTickets to count.
     * @example
     * // Count the number of SupportTickets
     * const count = await prisma.supportTicket.count({
     *   where: {
     *     // ... the filter for the SupportTickets we want to count
     *   }
     * })
    **/
    count<T extends SupportTicketCountArgs>(
      args?: Subset<T, SupportTicketCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SupportTicketCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SupportTicket.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupportTicketAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SupportTicketAggregateArgs>(args: Subset<T, SupportTicketAggregateArgs>): Prisma.PrismaPromise<GetSupportTicketAggregateType<T>>

    /**
     * Group by SupportTicket.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupportTicketGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SupportTicketGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SupportTicketGroupByArgs['orderBy'] }
        : { orderBy?: SupportTicketGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SupportTicketGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSupportTicketGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SupportTicket model
   */
  readonly fields: SupportTicketFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SupportTicket.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SupportTicketClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    property<T extends PropertyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PropertyDefaultArgs<ExtArgs>>): Prisma__PropertyClient<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SupportTicket model
   */ 
  interface SupportTicketFieldRefs {
    readonly id: FieldRef<"SupportTicket", 'String'>
    readonly userId: FieldRef<"SupportTicket", 'String'>
    readonly propertyId: FieldRef<"SupportTicket", 'String'>
    readonly category: FieldRef<"SupportTicket", 'TicketCategory'>
    readonly priority: FieldRef<"SupportTicket", 'TicketPriority'>
    readonly status: FieldRef<"SupportTicket", 'TicketStatus'>
    readonly title: FieldRef<"SupportTicket", 'String'>
    readonly description: FieldRef<"SupportTicket", 'String'>
    readonly estimatedResponse: FieldRef<"SupportTicket", 'String'>
    readonly createdAt: FieldRef<"SupportTicket", 'DateTime'>
    readonly updatedAt: FieldRef<"SupportTicket", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SupportTicket findUnique
   */
  export type SupportTicketFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportTicket
     */
    select?: SupportTicketSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportTicketInclude<ExtArgs> | null
    /**
     * Filter, which SupportTicket to fetch.
     */
    where: SupportTicketWhereUniqueInput
  }

  /**
   * SupportTicket findUniqueOrThrow
   */
  export type SupportTicketFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportTicket
     */
    select?: SupportTicketSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportTicketInclude<ExtArgs> | null
    /**
     * Filter, which SupportTicket to fetch.
     */
    where: SupportTicketWhereUniqueInput
  }

  /**
   * SupportTicket findFirst
   */
  export type SupportTicketFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportTicket
     */
    select?: SupportTicketSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportTicketInclude<ExtArgs> | null
    /**
     * Filter, which SupportTicket to fetch.
     */
    where?: SupportTicketWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SupportTickets to fetch.
     */
    orderBy?: SupportTicketOrderByWithRelationInput | SupportTicketOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SupportTickets.
     */
    cursor?: SupportTicketWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SupportTickets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SupportTickets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SupportTickets.
     */
    distinct?: SupportTicketScalarFieldEnum | SupportTicketScalarFieldEnum[]
  }

  /**
   * SupportTicket findFirstOrThrow
   */
  export type SupportTicketFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportTicket
     */
    select?: SupportTicketSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportTicketInclude<ExtArgs> | null
    /**
     * Filter, which SupportTicket to fetch.
     */
    where?: SupportTicketWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SupportTickets to fetch.
     */
    orderBy?: SupportTicketOrderByWithRelationInput | SupportTicketOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SupportTickets.
     */
    cursor?: SupportTicketWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SupportTickets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SupportTickets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SupportTickets.
     */
    distinct?: SupportTicketScalarFieldEnum | SupportTicketScalarFieldEnum[]
  }

  /**
   * SupportTicket findMany
   */
  export type SupportTicketFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportTicket
     */
    select?: SupportTicketSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportTicketInclude<ExtArgs> | null
    /**
     * Filter, which SupportTickets to fetch.
     */
    where?: SupportTicketWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SupportTickets to fetch.
     */
    orderBy?: SupportTicketOrderByWithRelationInput | SupportTicketOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SupportTickets.
     */
    cursor?: SupportTicketWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SupportTickets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SupportTickets.
     */
    skip?: number
    distinct?: SupportTicketScalarFieldEnum | SupportTicketScalarFieldEnum[]
  }

  /**
   * SupportTicket create
   */
  export type SupportTicketCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportTicket
     */
    select?: SupportTicketSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportTicketInclude<ExtArgs> | null
    /**
     * The data needed to create a SupportTicket.
     */
    data: XOR<SupportTicketCreateInput, SupportTicketUncheckedCreateInput>
  }

  /**
   * SupportTicket createMany
   */
  export type SupportTicketCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SupportTickets.
     */
    data: SupportTicketCreateManyInput | SupportTicketCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SupportTicket createManyAndReturn
   */
  export type SupportTicketCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportTicket
     */
    select?: SupportTicketSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many SupportTickets.
     */
    data: SupportTicketCreateManyInput | SupportTicketCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportTicketIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * SupportTicket update
   */
  export type SupportTicketUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportTicket
     */
    select?: SupportTicketSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportTicketInclude<ExtArgs> | null
    /**
     * The data needed to update a SupportTicket.
     */
    data: XOR<SupportTicketUpdateInput, SupportTicketUncheckedUpdateInput>
    /**
     * Choose, which SupportTicket to update.
     */
    where: SupportTicketWhereUniqueInput
  }

  /**
   * SupportTicket updateMany
   */
  export type SupportTicketUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SupportTickets.
     */
    data: XOR<SupportTicketUpdateManyMutationInput, SupportTicketUncheckedUpdateManyInput>
    /**
     * Filter which SupportTickets to update
     */
    where?: SupportTicketWhereInput
  }

  /**
   * SupportTicket upsert
   */
  export type SupportTicketUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportTicket
     */
    select?: SupportTicketSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportTicketInclude<ExtArgs> | null
    /**
     * The filter to search for the SupportTicket to update in case it exists.
     */
    where: SupportTicketWhereUniqueInput
    /**
     * In case the SupportTicket found by the `where` argument doesn't exist, create a new SupportTicket with this data.
     */
    create: XOR<SupportTicketCreateInput, SupportTicketUncheckedCreateInput>
    /**
     * In case the SupportTicket was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SupportTicketUpdateInput, SupportTicketUncheckedUpdateInput>
  }

  /**
   * SupportTicket delete
   */
  export type SupportTicketDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportTicket
     */
    select?: SupportTicketSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportTicketInclude<ExtArgs> | null
    /**
     * Filter which SupportTicket to delete.
     */
    where: SupportTicketWhereUniqueInput
  }

  /**
   * SupportTicket deleteMany
   */
  export type SupportTicketDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SupportTickets to delete
     */
    where?: SupportTicketWhereInput
  }

  /**
   * SupportTicket without action
   */
  export type SupportTicketDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupportTicket
     */
    select?: SupportTicketSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupportTicketInclude<ExtArgs> | null
  }


  /**
   * Model AIMessage
   */

  export type AggregateAIMessage = {
    _count: AIMessageCountAggregateOutputType | null
    _min: AIMessageMinAggregateOutputType | null
    _max: AIMessageMaxAggregateOutputType | null
  }

  export type AIMessageMinAggregateOutputType = {
    id: string | null
    userId: string | null
    propertyId: string | null
    role: $Enums.ChatRole | null
    content: string | null
    createdAt: Date | null
  }

  export type AIMessageMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    propertyId: string | null
    role: $Enums.ChatRole | null
    content: string | null
    createdAt: Date | null
  }

  export type AIMessageCountAggregateOutputType = {
    id: number
    userId: number
    propertyId: number
    role: number
    content: number
    createdAt: number
    _all: number
  }


  export type AIMessageMinAggregateInputType = {
    id?: true
    userId?: true
    propertyId?: true
    role?: true
    content?: true
    createdAt?: true
  }

  export type AIMessageMaxAggregateInputType = {
    id?: true
    userId?: true
    propertyId?: true
    role?: true
    content?: true
    createdAt?: true
  }

  export type AIMessageCountAggregateInputType = {
    id?: true
    userId?: true
    propertyId?: true
    role?: true
    content?: true
    createdAt?: true
    _all?: true
  }

  export type AIMessageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AIMessage to aggregate.
     */
    where?: AIMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIMessages to fetch.
     */
    orderBy?: AIMessageOrderByWithRelationInput | AIMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AIMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AIMessages
    **/
    _count?: true | AIMessageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AIMessageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AIMessageMaxAggregateInputType
  }

  export type GetAIMessageAggregateType<T extends AIMessageAggregateArgs> = {
        [P in keyof T & keyof AggregateAIMessage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAIMessage[P]>
      : GetScalarType<T[P], AggregateAIMessage[P]>
  }




  export type AIMessageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AIMessageWhereInput
    orderBy?: AIMessageOrderByWithAggregationInput | AIMessageOrderByWithAggregationInput[]
    by: AIMessageScalarFieldEnum[] | AIMessageScalarFieldEnum
    having?: AIMessageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AIMessageCountAggregateInputType | true
    _min?: AIMessageMinAggregateInputType
    _max?: AIMessageMaxAggregateInputType
  }

  export type AIMessageGroupByOutputType = {
    id: string
    userId: string
    propertyId: string
    role: $Enums.ChatRole
    content: string
    createdAt: Date
    _count: AIMessageCountAggregateOutputType | null
    _min: AIMessageMinAggregateOutputType | null
    _max: AIMessageMaxAggregateOutputType | null
  }

  type GetAIMessageGroupByPayload<T extends AIMessageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AIMessageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AIMessageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AIMessageGroupByOutputType[P]>
            : GetScalarType<T[P], AIMessageGroupByOutputType[P]>
        }
      >
    >


  export type AIMessageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    propertyId?: boolean
    role?: boolean
    content?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    property?: boolean | PropertyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["aIMessage"]>

  export type AIMessageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    propertyId?: boolean
    role?: boolean
    content?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    property?: boolean | PropertyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["aIMessage"]>

  export type AIMessageSelectScalar = {
    id?: boolean
    userId?: boolean
    propertyId?: boolean
    role?: boolean
    content?: boolean
    createdAt?: boolean
  }

  export type AIMessageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    property?: boolean | PropertyDefaultArgs<ExtArgs>
  }
  export type AIMessageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    property?: boolean | PropertyDefaultArgs<ExtArgs>
  }

  export type $AIMessagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AIMessage"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      property: Prisma.$PropertyPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      propertyId: string
      role: $Enums.ChatRole
      content: string
      createdAt: Date
    }, ExtArgs["result"]["aIMessage"]>
    composites: {}
  }

  type AIMessageGetPayload<S extends boolean | null | undefined | AIMessageDefaultArgs> = $Result.GetResult<Prisma.$AIMessagePayload, S>

  type AIMessageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AIMessageFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AIMessageCountAggregateInputType | true
    }

  export interface AIMessageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AIMessage'], meta: { name: 'AIMessage' } }
    /**
     * Find zero or one AIMessage that matches the filter.
     * @param {AIMessageFindUniqueArgs} args - Arguments to find a AIMessage
     * @example
     * // Get one AIMessage
     * const aIMessage = await prisma.aIMessage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AIMessageFindUniqueArgs>(args: SelectSubset<T, AIMessageFindUniqueArgs<ExtArgs>>): Prisma__AIMessageClient<$Result.GetResult<Prisma.$AIMessagePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one AIMessage that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AIMessageFindUniqueOrThrowArgs} args - Arguments to find a AIMessage
     * @example
     * // Get one AIMessage
     * const aIMessage = await prisma.aIMessage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AIMessageFindUniqueOrThrowArgs>(args: SelectSubset<T, AIMessageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AIMessageClient<$Result.GetResult<Prisma.$AIMessagePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first AIMessage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIMessageFindFirstArgs} args - Arguments to find a AIMessage
     * @example
     * // Get one AIMessage
     * const aIMessage = await prisma.aIMessage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AIMessageFindFirstArgs>(args?: SelectSubset<T, AIMessageFindFirstArgs<ExtArgs>>): Prisma__AIMessageClient<$Result.GetResult<Prisma.$AIMessagePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first AIMessage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIMessageFindFirstOrThrowArgs} args - Arguments to find a AIMessage
     * @example
     * // Get one AIMessage
     * const aIMessage = await prisma.aIMessage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AIMessageFindFirstOrThrowArgs>(args?: SelectSubset<T, AIMessageFindFirstOrThrowArgs<ExtArgs>>): Prisma__AIMessageClient<$Result.GetResult<Prisma.$AIMessagePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more AIMessages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIMessageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AIMessages
     * const aIMessages = await prisma.aIMessage.findMany()
     * 
     * // Get first 10 AIMessages
     * const aIMessages = await prisma.aIMessage.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const aIMessageWithIdOnly = await prisma.aIMessage.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AIMessageFindManyArgs>(args?: SelectSubset<T, AIMessageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIMessagePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a AIMessage.
     * @param {AIMessageCreateArgs} args - Arguments to create a AIMessage.
     * @example
     * // Create one AIMessage
     * const AIMessage = await prisma.aIMessage.create({
     *   data: {
     *     // ... data to create a AIMessage
     *   }
     * })
     * 
     */
    create<T extends AIMessageCreateArgs>(args: SelectSubset<T, AIMessageCreateArgs<ExtArgs>>): Prisma__AIMessageClient<$Result.GetResult<Prisma.$AIMessagePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many AIMessages.
     * @param {AIMessageCreateManyArgs} args - Arguments to create many AIMessages.
     * @example
     * // Create many AIMessages
     * const aIMessage = await prisma.aIMessage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AIMessageCreateManyArgs>(args?: SelectSubset<T, AIMessageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AIMessages and returns the data saved in the database.
     * @param {AIMessageCreateManyAndReturnArgs} args - Arguments to create many AIMessages.
     * @example
     * // Create many AIMessages
     * const aIMessage = await prisma.aIMessage.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AIMessages and only return the `id`
     * const aIMessageWithIdOnly = await prisma.aIMessage.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AIMessageCreateManyAndReturnArgs>(args?: SelectSubset<T, AIMessageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AIMessagePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a AIMessage.
     * @param {AIMessageDeleteArgs} args - Arguments to delete one AIMessage.
     * @example
     * // Delete one AIMessage
     * const AIMessage = await prisma.aIMessage.delete({
     *   where: {
     *     // ... filter to delete one AIMessage
     *   }
     * })
     * 
     */
    delete<T extends AIMessageDeleteArgs>(args: SelectSubset<T, AIMessageDeleteArgs<ExtArgs>>): Prisma__AIMessageClient<$Result.GetResult<Prisma.$AIMessagePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one AIMessage.
     * @param {AIMessageUpdateArgs} args - Arguments to update one AIMessage.
     * @example
     * // Update one AIMessage
     * const aIMessage = await prisma.aIMessage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AIMessageUpdateArgs>(args: SelectSubset<T, AIMessageUpdateArgs<ExtArgs>>): Prisma__AIMessageClient<$Result.GetResult<Prisma.$AIMessagePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more AIMessages.
     * @param {AIMessageDeleteManyArgs} args - Arguments to filter AIMessages to delete.
     * @example
     * // Delete a few AIMessages
     * const { count } = await prisma.aIMessage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AIMessageDeleteManyArgs>(args?: SelectSubset<T, AIMessageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AIMessages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIMessageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AIMessages
     * const aIMessage = await prisma.aIMessage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AIMessageUpdateManyArgs>(args: SelectSubset<T, AIMessageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AIMessage.
     * @param {AIMessageUpsertArgs} args - Arguments to update or create a AIMessage.
     * @example
     * // Update or create a AIMessage
     * const aIMessage = await prisma.aIMessage.upsert({
     *   create: {
     *     // ... data to create a AIMessage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AIMessage we want to update
     *   }
     * })
     */
    upsert<T extends AIMessageUpsertArgs>(args: SelectSubset<T, AIMessageUpsertArgs<ExtArgs>>): Prisma__AIMessageClient<$Result.GetResult<Prisma.$AIMessagePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of AIMessages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIMessageCountArgs} args - Arguments to filter AIMessages to count.
     * @example
     * // Count the number of AIMessages
     * const count = await prisma.aIMessage.count({
     *   where: {
     *     // ... the filter for the AIMessages we want to count
     *   }
     * })
    **/
    count<T extends AIMessageCountArgs>(
      args?: Subset<T, AIMessageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AIMessageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AIMessage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIMessageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AIMessageAggregateArgs>(args: Subset<T, AIMessageAggregateArgs>): Prisma.PrismaPromise<GetAIMessageAggregateType<T>>

    /**
     * Group by AIMessage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AIMessageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AIMessageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AIMessageGroupByArgs['orderBy'] }
        : { orderBy?: AIMessageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AIMessageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAIMessageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AIMessage model
   */
  readonly fields: AIMessageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AIMessage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AIMessageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    property<T extends PropertyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PropertyDefaultArgs<ExtArgs>>): Prisma__PropertyClient<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AIMessage model
   */ 
  interface AIMessageFieldRefs {
    readonly id: FieldRef<"AIMessage", 'String'>
    readonly userId: FieldRef<"AIMessage", 'String'>
    readonly propertyId: FieldRef<"AIMessage", 'String'>
    readonly role: FieldRef<"AIMessage", 'ChatRole'>
    readonly content: FieldRef<"AIMessage", 'String'>
    readonly createdAt: FieldRef<"AIMessage", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AIMessage findUnique
   */
  export type AIMessageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIMessage
     */
    select?: AIMessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIMessageInclude<ExtArgs> | null
    /**
     * Filter, which AIMessage to fetch.
     */
    where: AIMessageWhereUniqueInput
  }

  /**
   * AIMessage findUniqueOrThrow
   */
  export type AIMessageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIMessage
     */
    select?: AIMessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIMessageInclude<ExtArgs> | null
    /**
     * Filter, which AIMessage to fetch.
     */
    where: AIMessageWhereUniqueInput
  }

  /**
   * AIMessage findFirst
   */
  export type AIMessageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIMessage
     */
    select?: AIMessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIMessageInclude<ExtArgs> | null
    /**
     * Filter, which AIMessage to fetch.
     */
    where?: AIMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIMessages to fetch.
     */
    orderBy?: AIMessageOrderByWithRelationInput | AIMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AIMessages.
     */
    cursor?: AIMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AIMessages.
     */
    distinct?: AIMessageScalarFieldEnum | AIMessageScalarFieldEnum[]
  }

  /**
   * AIMessage findFirstOrThrow
   */
  export type AIMessageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIMessage
     */
    select?: AIMessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIMessageInclude<ExtArgs> | null
    /**
     * Filter, which AIMessage to fetch.
     */
    where?: AIMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIMessages to fetch.
     */
    orderBy?: AIMessageOrderByWithRelationInput | AIMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AIMessages.
     */
    cursor?: AIMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AIMessages.
     */
    distinct?: AIMessageScalarFieldEnum | AIMessageScalarFieldEnum[]
  }

  /**
   * AIMessage findMany
   */
  export type AIMessageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIMessage
     */
    select?: AIMessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIMessageInclude<ExtArgs> | null
    /**
     * Filter, which AIMessages to fetch.
     */
    where?: AIMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AIMessages to fetch.
     */
    orderBy?: AIMessageOrderByWithRelationInput | AIMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AIMessages.
     */
    cursor?: AIMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AIMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AIMessages.
     */
    skip?: number
    distinct?: AIMessageScalarFieldEnum | AIMessageScalarFieldEnum[]
  }

  /**
   * AIMessage create
   */
  export type AIMessageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIMessage
     */
    select?: AIMessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIMessageInclude<ExtArgs> | null
    /**
     * The data needed to create a AIMessage.
     */
    data: XOR<AIMessageCreateInput, AIMessageUncheckedCreateInput>
  }

  /**
   * AIMessage createMany
   */
  export type AIMessageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AIMessages.
     */
    data: AIMessageCreateManyInput | AIMessageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AIMessage createManyAndReturn
   */
  export type AIMessageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIMessage
     */
    select?: AIMessageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many AIMessages.
     */
    data: AIMessageCreateManyInput | AIMessageCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIMessageIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AIMessage update
   */
  export type AIMessageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIMessage
     */
    select?: AIMessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIMessageInclude<ExtArgs> | null
    /**
     * The data needed to update a AIMessage.
     */
    data: XOR<AIMessageUpdateInput, AIMessageUncheckedUpdateInput>
    /**
     * Choose, which AIMessage to update.
     */
    where: AIMessageWhereUniqueInput
  }

  /**
   * AIMessage updateMany
   */
  export type AIMessageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AIMessages.
     */
    data: XOR<AIMessageUpdateManyMutationInput, AIMessageUncheckedUpdateManyInput>
    /**
     * Filter which AIMessages to update
     */
    where?: AIMessageWhereInput
  }

  /**
   * AIMessage upsert
   */
  export type AIMessageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIMessage
     */
    select?: AIMessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIMessageInclude<ExtArgs> | null
    /**
     * The filter to search for the AIMessage to update in case it exists.
     */
    where: AIMessageWhereUniqueInput
    /**
     * In case the AIMessage found by the `where` argument doesn't exist, create a new AIMessage with this data.
     */
    create: XOR<AIMessageCreateInput, AIMessageUncheckedCreateInput>
    /**
     * In case the AIMessage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AIMessageUpdateInput, AIMessageUncheckedUpdateInput>
  }

  /**
   * AIMessage delete
   */
  export type AIMessageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIMessage
     */
    select?: AIMessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIMessageInclude<ExtArgs> | null
    /**
     * Filter which AIMessage to delete.
     */
    where: AIMessageWhereUniqueInput
  }

  /**
   * AIMessage deleteMany
   */
  export type AIMessageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AIMessages to delete
     */
    where?: AIMessageWhereInput
  }

  /**
   * AIMessage without action
   */
  export type AIMessageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AIMessage
     */
    select?: AIMessageSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AIMessageInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
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

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const RefreshTokenScalarFieldEnum: {
    id: 'id',
    token: 'token',
    userId: 'userId',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt',
    isRevoked: 'isRevoked'
  };

  export type RefreshTokenScalarFieldEnum = (typeof RefreshTokenScalarFieldEnum)[keyof typeof RefreshTokenScalarFieldEnum]


  export const PropertyScalarFieldEnum: {
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

  export type PropertyScalarFieldEnum = (typeof PropertyScalarFieldEnum)[keyof typeof PropertyScalarFieldEnum]


  export const SurveyScalarFieldEnum: {
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

  export type SurveyScalarFieldEnum = (typeof SurveyScalarFieldEnum)[keyof typeof SurveyScalarFieldEnum]


  export const ProposalScalarFieldEnum: {
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

  export type ProposalScalarFieldEnum = (typeof ProposalScalarFieldEnum)[keyof typeof ProposalScalarFieldEnum]


  export const PaymentScalarFieldEnum: {
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

  export type PaymentScalarFieldEnum = (typeof PaymentScalarFieldEnum)[keyof typeof PaymentScalarFieldEnum]


  export const InstallationProgressScalarFieldEnum: {
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

  export type InstallationProgressScalarFieldEnum = (typeof InstallationProgressScalarFieldEnum)[keyof typeof InstallationProgressScalarFieldEnum]


  export const EnergyStatScalarFieldEnum: {
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

  export type EnergyStatScalarFieldEnum = (typeof EnergyStatScalarFieldEnum)[keyof typeof EnergyStatScalarFieldEnum]


  export const NotificationScalarFieldEnum: {
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

  export type NotificationScalarFieldEnum = (typeof NotificationScalarFieldEnum)[keyof typeof NotificationScalarFieldEnum]


  export const AlertScalarFieldEnum: {
    id: 'id',
    propertyId: 'propertyId',
    category: 'category',
    severity: 'severity',
    title: 'title',
    message: 'message',
    read: 'read',
    createdAt: 'createdAt'
  };

  export type AlertScalarFieldEnum = (typeof AlertScalarFieldEnum)[keyof typeof AlertScalarFieldEnum]


  export const BillScalarFieldEnum: {
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

  export type BillScalarFieldEnum = (typeof BillScalarFieldEnum)[keyof typeof BillScalarFieldEnum]


  export const SupportTicketScalarFieldEnum: {
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

  export type SupportTicketScalarFieldEnum = (typeof SupportTicketScalarFieldEnum)[keyof typeof SupportTicketScalarFieldEnum]


  export const AIMessageScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    propertyId: 'propertyId',
    role: 'role',
    content: 'content',
    createdAt: 'createdAt'
  };

  export type AIMessageScalarFieldEnum = (typeof AIMessageScalarFieldEnum)[keyof typeof AIMessageScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'PropertyType'
   */
  export type EnumPropertyTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PropertyType'>
    


  /**
   * Reference to a field of type 'PropertyType[]'
   */
  export type ListEnumPropertyTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PropertyType[]'>
    


  /**
   * Reference to a field of type 'SubscriptionStatus'
   */
  export type EnumSubscriptionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SubscriptionStatus'>
    


  /**
   * Reference to a field of type 'SubscriptionStatus[]'
   */
  export type ListEnumSubscriptionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SubscriptionStatus[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'PaymentMethod'
   */
  export type EnumPaymentMethodFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentMethod'>
    


  /**
   * Reference to a field of type 'PaymentMethod[]'
   */
  export type ListEnumPaymentMethodFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentMethod[]'>
    


  /**
   * Reference to a field of type 'PaymentStatus'
   */
  export type EnumPaymentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentStatus'>
    


  /**
   * Reference to a field of type 'PaymentStatus[]'
   */
  export type ListEnumPaymentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentStatus[]'>
    


  /**
   * Reference to a field of type 'AlertCategory'
   */
  export type EnumAlertCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AlertCategory'>
    


  /**
   * Reference to a field of type 'AlertCategory[]'
   */
  export type ListEnumAlertCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AlertCategory[]'>
    


  /**
   * Reference to a field of type 'AlertSeverity'
   */
  export type EnumAlertSeverityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AlertSeverity'>
    


  /**
   * Reference to a field of type 'AlertSeverity[]'
   */
  export type ListEnumAlertSeverityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AlertSeverity[]'>
    


  /**
   * Reference to a field of type 'BillStatus'
   */
  export type EnumBillStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BillStatus'>
    


  /**
   * Reference to a field of type 'BillStatus[]'
   */
  export type ListEnumBillStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BillStatus[]'>
    


  /**
   * Reference to a field of type 'TicketCategory'
   */
  export type EnumTicketCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TicketCategory'>
    


  /**
   * Reference to a field of type 'TicketCategory[]'
   */
  export type ListEnumTicketCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TicketCategory[]'>
    


  /**
   * Reference to a field of type 'TicketPriority'
   */
  export type EnumTicketPriorityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TicketPriority'>
    


  /**
   * Reference to a field of type 'TicketPriority[]'
   */
  export type ListEnumTicketPriorityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TicketPriority[]'>
    


  /**
   * Reference to a field of type 'TicketStatus'
   */
  export type EnumTicketStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TicketStatus'>
    


  /**
   * Reference to a field of type 'TicketStatus[]'
   */
  export type ListEnumTicketStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TicketStatus[]'>
    


  /**
   * Reference to a field of type 'ChatRole'
   */
  export type EnumChatRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ChatRole'>
    


  /**
   * Reference to a field of type 'ChatRole[]'
   */
  export type ListEnumChatRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ChatRole[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    phone?: StringNullableFilter<"User"> | string | null
    address?: StringNullableFilter<"User"> | string | null
    role?: EnumRoleFilter<"User"> | $Enums.Role
    isActive?: BoolFilter<"User"> | boolean
    currentPropertyId?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    refreshTokens?: RefreshTokenListRelationFilter
    properties?: PropertyListRelationFilter
    notifications?: NotificationListRelationFilter
    supportTickets?: SupportTicketListRelationFilter
    aiMessages?: AIMessageListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    phone?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    role?: SortOrder
    isActive?: SortOrder
    currentPropertyId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    refreshTokens?: RefreshTokenOrderByRelationAggregateInput
    properties?: PropertyOrderByRelationAggregateInput
    notifications?: NotificationOrderByRelationAggregateInput
    supportTickets?: SupportTicketOrderByRelationAggregateInput
    aiMessages?: AIMessageOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    phone?: StringNullableFilter<"User"> | string | null
    address?: StringNullableFilter<"User"> | string | null
    role?: EnumRoleFilter<"User"> | $Enums.Role
    isActive?: BoolFilter<"User"> | boolean
    currentPropertyId?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    refreshTokens?: RefreshTokenListRelationFilter
    properties?: PropertyListRelationFilter
    notifications?: NotificationListRelationFilter
    supportTickets?: SupportTicketListRelationFilter
    aiMessages?: AIMessageListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    phone?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    role?: SortOrder
    isActive?: SortOrder
    currentPropertyId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    phone?: StringNullableWithAggregatesFilter<"User"> | string | null
    address?: StringNullableWithAggregatesFilter<"User"> | string | null
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    isActive?: BoolWithAggregatesFilter<"User"> | boolean
    currentPropertyId?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type RefreshTokenWhereInput = {
    AND?: RefreshTokenWhereInput | RefreshTokenWhereInput[]
    OR?: RefreshTokenWhereInput[]
    NOT?: RefreshTokenWhereInput | RefreshTokenWhereInput[]
    id?: StringFilter<"RefreshToken"> | string
    token?: StringFilter<"RefreshToken"> | string
    userId?: StringFilter<"RefreshToken"> | string
    expiresAt?: DateTimeFilter<"RefreshToken"> | Date | string
    createdAt?: DateTimeFilter<"RefreshToken"> | Date | string
    isRevoked?: BoolFilter<"RefreshToken"> | boolean
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type RefreshTokenOrderByWithRelationInput = {
    id?: SortOrder
    token?: SortOrder
    userId?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    isRevoked?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type RefreshTokenWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    token?: string
    AND?: RefreshTokenWhereInput | RefreshTokenWhereInput[]
    OR?: RefreshTokenWhereInput[]
    NOT?: RefreshTokenWhereInput | RefreshTokenWhereInput[]
    userId?: StringFilter<"RefreshToken"> | string
    expiresAt?: DateTimeFilter<"RefreshToken"> | Date | string
    createdAt?: DateTimeFilter<"RefreshToken"> | Date | string
    isRevoked?: BoolFilter<"RefreshToken"> | boolean
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id" | "token">

  export type RefreshTokenOrderByWithAggregationInput = {
    id?: SortOrder
    token?: SortOrder
    userId?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    isRevoked?: SortOrder
    _count?: RefreshTokenCountOrderByAggregateInput
    _max?: RefreshTokenMaxOrderByAggregateInput
    _min?: RefreshTokenMinOrderByAggregateInput
  }

  export type RefreshTokenScalarWhereWithAggregatesInput = {
    AND?: RefreshTokenScalarWhereWithAggregatesInput | RefreshTokenScalarWhereWithAggregatesInput[]
    OR?: RefreshTokenScalarWhereWithAggregatesInput[]
    NOT?: RefreshTokenScalarWhereWithAggregatesInput | RefreshTokenScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RefreshToken"> | string
    token?: StringWithAggregatesFilter<"RefreshToken"> | string
    userId?: StringWithAggregatesFilter<"RefreshToken"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"RefreshToken"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"RefreshToken"> | Date | string
    isRevoked?: BoolWithAggregatesFilter<"RefreshToken"> | boolean
  }

  export type PropertyWhereInput = {
    AND?: PropertyWhereInput | PropertyWhereInput[]
    OR?: PropertyWhereInput[]
    NOT?: PropertyWhereInput | PropertyWhereInput[]
    id?: StringFilter<"Property"> | string
    userId?: StringFilter<"Property"> | string
    name?: StringFilter<"Property"> | string
    address?: StringFilter<"Property"> | string
    type?: EnumPropertyTypeFilter<"Property"> | $Enums.PropertyType
    subscriptionStatus?: EnumSubscriptionStatusFilter<"Property"> | $Enums.SubscriptionStatus
    planType?: StringNullableFilter<"Property"> | string | null
    solarCapacity?: FloatNullableFilter<"Property"> | number | null
    batteryStorage?: FloatNullableFilter<"Property"> | number | null
    installationDate?: DateTimeNullableFilter<"Property"> | Date | string | null
    createdAt?: DateTimeFilter<"Property"> | Date | string
    updatedAt?: DateTimeFilter<"Property"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    surveys?: SurveyListRelationFilter
    proposals?: ProposalListRelationFilter
    payments?: PaymentListRelationFilter
    installation?: XOR<InstallationProgressNullableRelationFilter, InstallationProgressWhereInput> | null
    energyStats?: EnergyStatListRelationFilter
    alerts?: AlertListRelationFilter
    bills?: BillListRelationFilter
    supportTickets?: SupportTicketListRelationFilter
    aiMessages?: AIMessageListRelationFilter
  }

  export type PropertyOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    address?: SortOrder
    type?: SortOrder
    subscriptionStatus?: SortOrder
    planType?: SortOrderInput | SortOrder
    solarCapacity?: SortOrderInput | SortOrder
    batteryStorage?: SortOrderInput | SortOrder
    installationDate?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    surveys?: SurveyOrderByRelationAggregateInput
    proposals?: ProposalOrderByRelationAggregateInput
    payments?: PaymentOrderByRelationAggregateInput
    installation?: InstallationProgressOrderByWithRelationInput
    energyStats?: EnergyStatOrderByRelationAggregateInput
    alerts?: AlertOrderByRelationAggregateInput
    bills?: BillOrderByRelationAggregateInput
    supportTickets?: SupportTicketOrderByRelationAggregateInput
    aiMessages?: AIMessageOrderByRelationAggregateInput
  }

  export type PropertyWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PropertyWhereInput | PropertyWhereInput[]
    OR?: PropertyWhereInput[]
    NOT?: PropertyWhereInput | PropertyWhereInput[]
    userId?: StringFilter<"Property"> | string
    name?: StringFilter<"Property"> | string
    address?: StringFilter<"Property"> | string
    type?: EnumPropertyTypeFilter<"Property"> | $Enums.PropertyType
    subscriptionStatus?: EnumSubscriptionStatusFilter<"Property"> | $Enums.SubscriptionStatus
    planType?: StringNullableFilter<"Property"> | string | null
    solarCapacity?: FloatNullableFilter<"Property"> | number | null
    batteryStorage?: FloatNullableFilter<"Property"> | number | null
    installationDate?: DateTimeNullableFilter<"Property"> | Date | string | null
    createdAt?: DateTimeFilter<"Property"> | Date | string
    updatedAt?: DateTimeFilter<"Property"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    surveys?: SurveyListRelationFilter
    proposals?: ProposalListRelationFilter
    payments?: PaymentListRelationFilter
    installation?: XOR<InstallationProgressNullableRelationFilter, InstallationProgressWhereInput> | null
    energyStats?: EnergyStatListRelationFilter
    alerts?: AlertListRelationFilter
    bills?: BillListRelationFilter
    supportTickets?: SupportTicketListRelationFilter
    aiMessages?: AIMessageListRelationFilter
  }, "id">

  export type PropertyOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    address?: SortOrder
    type?: SortOrder
    subscriptionStatus?: SortOrder
    planType?: SortOrderInput | SortOrder
    solarCapacity?: SortOrderInput | SortOrder
    batteryStorage?: SortOrderInput | SortOrder
    installationDate?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PropertyCountOrderByAggregateInput
    _avg?: PropertyAvgOrderByAggregateInput
    _max?: PropertyMaxOrderByAggregateInput
    _min?: PropertyMinOrderByAggregateInput
    _sum?: PropertySumOrderByAggregateInput
  }

  export type PropertyScalarWhereWithAggregatesInput = {
    AND?: PropertyScalarWhereWithAggregatesInput | PropertyScalarWhereWithAggregatesInput[]
    OR?: PropertyScalarWhereWithAggregatesInput[]
    NOT?: PropertyScalarWhereWithAggregatesInput | PropertyScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Property"> | string
    userId?: StringWithAggregatesFilter<"Property"> | string
    name?: StringWithAggregatesFilter<"Property"> | string
    address?: StringWithAggregatesFilter<"Property"> | string
    type?: EnumPropertyTypeWithAggregatesFilter<"Property"> | $Enums.PropertyType
    subscriptionStatus?: EnumSubscriptionStatusWithAggregatesFilter<"Property"> | $Enums.SubscriptionStatus
    planType?: StringNullableWithAggregatesFilter<"Property"> | string | null
    solarCapacity?: FloatNullableWithAggregatesFilter<"Property"> | number | null
    batteryStorage?: FloatNullableWithAggregatesFilter<"Property"> | number | null
    installationDate?: DateTimeNullableWithAggregatesFilter<"Property"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Property"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Property"> | Date | string
  }

  export type SurveyWhereInput = {
    AND?: SurveyWhereInput | SurveyWhereInput[]
    OR?: SurveyWhereInput[]
    NOT?: SurveyWhereInput | SurveyWhereInput[]
    id?: StringFilter<"Survey"> | string
    propertyId?: StringFilter<"Survey"> | string
    propertyType?: EnumPropertyTypeFilter<"Survey"> | $Enums.PropertyType
    roofArea?: FloatFilter<"Survey"> | number
    monthlyBill?: FloatFilter<"Survey"> | number
    monthlyConsumption?: FloatFilter<"Survey"> | number
    peakHours?: StringFilter<"Survey"> | string
    occupants?: IntFilter<"Survey"> | number
    appliances?: StringNullableListFilter<"Survey">
    status?: StringFilter<"Survey"> | string
    submittedAt?: DateTimeFilter<"Survey"> | Date | string
    property?: XOR<PropertyRelationFilter, PropertyWhereInput>
  }

  export type SurveyOrderByWithRelationInput = {
    id?: SortOrder
    propertyId?: SortOrder
    propertyType?: SortOrder
    roofArea?: SortOrder
    monthlyBill?: SortOrder
    monthlyConsumption?: SortOrder
    peakHours?: SortOrder
    occupants?: SortOrder
    appliances?: SortOrder
    status?: SortOrder
    submittedAt?: SortOrder
    property?: PropertyOrderByWithRelationInput
  }

  export type SurveyWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SurveyWhereInput | SurveyWhereInput[]
    OR?: SurveyWhereInput[]
    NOT?: SurveyWhereInput | SurveyWhereInput[]
    propertyId?: StringFilter<"Survey"> | string
    propertyType?: EnumPropertyTypeFilter<"Survey"> | $Enums.PropertyType
    roofArea?: FloatFilter<"Survey"> | number
    monthlyBill?: FloatFilter<"Survey"> | number
    monthlyConsumption?: FloatFilter<"Survey"> | number
    peakHours?: StringFilter<"Survey"> | string
    occupants?: IntFilter<"Survey"> | number
    appliances?: StringNullableListFilter<"Survey">
    status?: StringFilter<"Survey"> | string
    submittedAt?: DateTimeFilter<"Survey"> | Date | string
    property?: XOR<PropertyRelationFilter, PropertyWhereInput>
  }, "id">

  export type SurveyOrderByWithAggregationInput = {
    id?: SortOrder
    propertyId?: SortOrder
    propertyType?: SortOrder
    roofArea?: SortOrder
    monthlyBill?: SortOrder
    monthlyConsumption?: SortOrder
    peakHours?: SortOrder
    occupants?: SortOrder
    appliances?: SortOrder
    status?: SortOrder
    submittedAt?: SortOrder
    _count?: SurveyCountOrderByAggregateInput
    _avg?: SurveyAvgOrderByAggregateInput
    _max?: SurveyMaxOrderByAggregateInput
    _min?: SurveyMinOrderByAggregateInput
    _sum?: SurveySumOrderByAggregateInput
  }

  export type SurveyScalarWhereWithAggregatesInput = {
    AND?: SurveyScalarWhereWithAggregatesInput | SurveyScalarWhereWithAggregatesInput[]
    OR?: SurveyScalarWhereWithAggregatesInput[]
    NOT?: SurveyScalarWhereWithAggregatesInput | SurveyScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Survey"> | string
    propertyId?: StringWithAggregatesFilter<"Survey"> | string
    propertyType?: EnumPropertyTypeWithAggregatesFilter<"Survey"> | $Enums.PropertyType
    roofArea?: FloatWithAggregatesFilter<"Survey"> | number
    monthlyBill?: FloatWithAggregatesFilter<"Survey"> | number
    monthlyConsumption?: FloatWithAggregatesFilter<"Survey"> | number
    peakHours?: StringWithAggregatesFilter<"Survey"> | string
    occupants?: IntWithAggregatesFilter<"Survey"> | number
    appliances?: StringNullableListFilter<"Survey">
    status?: StringWithAggregatesFilter<"Survey"> | string
    submittedAt?: DateTimeWithAggregatesFilter<"Survey"> | Date | string
  }

  export type ProposalWhereInput = {
    AND?: ProposalWhereInput | ProposalWhereInput[]
    OR?: ProposalWhereInput[]
    NOT?: ProposalWhereInput | ProposalWhereInput[]
    id?: StringFilter<"Proposal"> | string
    propertyId?: StringFilter<"Proposal"> | string
    surveyId?: StringFilter<"Proposal"> | string
    solarCapacity?: FloatFilter<"Proposal"> | number
    batteryStorage?: FloatFilter<"Proposal"> | number
    monthlyFee?: FloatFilter<"Proposal"> | number
    estimatedSavings?: FloatFilter<"Proposal"> | number
    estimatedProduction?: FloatFilter<"Proposal"> | number
    contractDuration?: IntFilter<"Proposal"> | number
    installationFee?: FloatFilter<"Proposal"> | number
    securityDeposit?: FloatFilter<"Proposal"> | number
    whatsIncluded?: StringNullableListFilter<"Proposal">
    generatedAt?: DateTimeFilter<"Proposal"> | Date | string
    expiresAt?: DateTimeFilter<"Proposal"> | Date | string
    property?: XOR<PropertyRelationFilter, PropertyWhereInput>
  }

  export type ProposalOrderByWithRelationInput = {
    id?: SortOrder
    propertyId?: SortOrder
    surveyId?: SortOrder
    solarCapacity?: SortOrder
    batteryStorage?: SortOrder
    monthlyFee?: SortOrder
    estimatedSavings?: SortOrder
    estimatedProduction?: SortOrder
    contractDuration?: SortOrder
    installationFee?: SortOrder
    securityDeposit?: SortOrder
    whatsIncluded?: SortOrder
    generatedAt?: SortOrder
    expiresAt?: SortOrder
    property?: PropertyOrderByWithRelationInput
  }

  export type ProposalWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ProposalWhereInput | ProposalWhereInput[]
    OR?: ProposalWhereInput[]
    NOT?: ProposalWhereInput | ProposalWhereInput[]
    propertyId?: StringFilter<"Proposal"> | string
    surveyId?: StringFilter<"Proposal"> | string
    solarCapacity?: FloatFilter<"Proposal"> | number
    batteryStorage?: FloatFilter<"Proposal"> | number
    monthlyFee?: FloatFilter<"Proposal"> | number
    estimatedSavings?: FloatFilter<"Proposal"> | number
    estimatedProduction?: FloatFilter<"Proposal"> | number
    contractDuration?: IntFilter<"Proposal"> | number
    installationFee?: FloatFilter<"Proposal"> | number
    securityDeposit?: FloatFilter<"Proposal"> | number
    whatsIncluded?: StringNullableListFilter<"Proposal">
    generatedAt?: DateTimeFilter<"Proposal"> | Date | string
    expiresAt?: DateTimeFilter<"Proposal"> | Date | string
    property?: XOR<PropertyRelationFilter, PropertyWhereInput>
  }, "id">

  export type ProposalOrderByWithAggregationInput = {
    id?: SortOrder
    propertyId?: SortOrder
    surveyId?: SortOrder
    solarCapacity?: SortOrder
    batteryStorage?: SortOrder
    monthlyFee?: SortOrder
    estimatedSavings?: SortOrder
    estimatedProduction?: SortOrder
    contractDuration?: SortOrder
    installationFee?: SortOrder
    securityDeposit?: SortOrder
    whatsIncluded?: SortOrder
    generatedAt?: SortOrder
    expiresAt?: SortOrder
    _count?: ProposalCountOrderByAggregateInput
    _avg?: ProposalAvgOrderByAggregateInput
    _max?: ProposalMaxOrderByAggregateInput
    _min?: ProposalMinOrderByAggregateInput
    _sum?: ProposalSumOrderByAggregateInput
  }

  export type ProposalScalarWhereWithAggregatesInput = {
    AND?: ProposalScalarWhereWithAggregatesInput | ProposalScalarWhereWithAggregatesInput[]
    OR?: ProposalScalarWhereWithAggregatesInput[]
    NOT?: ProposalScalarWhereWithAggregatesInput | ProposalScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Proposal"> | string
    propertyId?: StringWithAggregatesFilter<"Proposal"> | string
    surveyId?: StringWithAggregatesFilter<"Proposal"> | string
    solarCapacity?: FloatWithAggregatesFilter<"Proposal"> | number
    batteryStorage?: FloatWithAggregatesFilter<"Proposal"> | number
    monthlyFee?: FloatWithAggregatesFilter<"Proposal"> | number
    estimatedSavings?: FloatWithAggregatesFilter<"Proposal"> | number
    estimatedProduction?: FloatWithAggregatesFilter<"Proposal"> | number
    contractDuration?: IntWithAggregatesFilter<"Proposal"> | number
    installationFee?: FloatWithAggregatesFilter<"Proposal"> | number
    securityDeposit?: FloatWithAggregatesFilter<"Proposal"> | number
    whatsIncluded?: StringNullableListFilter<"Proposal">
    generatedAt?: DateTimeWithAggregatesFilter<"Proposal"> | Date | string
    expiresAt?: DateTimeWithAggregatesFilter<"Proposal"> | Date | string
  }

  export type PaymentWhereInput = {
    AND?: PaymentWhereInput | PaymentWhereInput[]
    OR?: PaymentWhereInput[]
    NOT?: PaymentWhereInput | PaymentWhereInput[]
    id?: StringFilter<"Payment"> | string
    propertyId?: StringFilter<"Payment"> | string
    proposalId?: StringNullableFilter<"Payment"> | string | null
    orderId?: StringFilter<"Payment"> | string
    transactionId?: StringNullableFilter<"Payment"> | string | null
    paymentMethod?: EnumPaymentMethodFilter<"Payment"> | $Enums.PaymentMethod
    amount?: FloatFilter<"Payment"> | number
    currency?: StringFilter<"Payment"> | string
    status?: EnumPaymentStatusFilter<"Payment"> | $Enums.PaymentStatus
    signature?: StringNullableFilter<"Payment"> | string | null
    description?: StringNullableFilter<"Payment"> | string | null
    paymentGatewayUrl?: StringNullableFilter<"Payment"> | string | null
    paidAt?: DateTimeNullableFilter<"Payment"> | Date | string | null
    createdAt?: DateTimeFilter<"Payment"> | Date | string
    property?: XOR<PropertyRelationFilter, PropertyWhereInput>
  }

  export type PaymentOrderByWithRelationInput = {
    id?: SortOrder
    propertyId?: SortOrder
    proposalId?: SortOrderInput | SortOrder
    orderId?: SortOrder
    transactionId?: SortOrderInput | SortOrder
    paymentMethod?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    signature?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    paymentGatewayUrl?: SortOrderInput | SortOrder
    paidAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    property?: PropertyOrderByWithRelationInput
  }

  export type PaymentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    orderId?: string
    AND?: PaymentWhereInput | PaymentWhereInput[]
    OR?: PaymentWhereInput[]
    NOT?: PaymentWhereInput | PaymentWhereInput[]
    propertyId?: StringFilter<"Payment"> | string
    proposalId?: StringNullableFilter<"Payment"> | string | null
    transactionId?: StringNullableFilter<"Payment"> | string | null
    paymentMethod?: EnumPaymentMethodFilter<"Payment"> | $Enums.PaymentMethod
    amount?: FloatFilter<"Payment"> | number
    currency?: StringFilter<"Payment"> | string
    status?: EnumPaymentStatusFilter<"Payment"> | $Enums.PaymentStatus
    signature?: StringNullableFilter<"Payment"> | string | null
    description?: StringNullableFilter<"Payment"> | string | null
    paymentGatewayUrl?: StringNullableFilter<"Payment"> | string | null
    paidAt?: DateTimeNullableFilter<"Payment"> | Date | string | null
    createdAt?: DateTimeFilter<"Payment"> | Date | string
    property?: XOR<PropertyRelationFilter, PropertyWhereInput>
  }, "id" | "orderId">

  export type PaymentOrderByWithAggregationInput = {
    id?: SortOrder
    propertyId?: SortOrder
    proposalId?: SortOrderInput | SortOrder
    orderId?: SortOrder
    transactionId?: SortOrderInput | SortOrder
    paymentMethod?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    signature?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    paymentGatewayUrl?: SortOrderInput | SortOrder
    paidAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: PaymentCountOrderByAggregateInput
    _avg?: PaymentAvgOrderByAggregateInput
    _max?: PaymentMaxOrderByAggregateInput
    _min?: PaymentMinOrderByAggregateInput
    _sum?: PaymentSumOrderByAggregateInput
  }

  export type PaymentScalarWhereWithAggregatesInput = {
    AND?: PaymentScalarWhereWithAggregatesInput | PaymentScalarWhereWithAggregatesInput[]
    OR?: PaymentScalarWhereWithAggregatesInput[]
    NOT?: PaymentScalarWhereWithAggregatesInput | PaymentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Payment"> | string
    propertyId?: StringWithAggregatesFilter<"Payment"> | string
    proposalId?: StringNullableWithAggregatesFilter<"Payment"> | string | null
    orderId?: StringWithAggregatesFilter<"Payment"> | string
    transactionId?: StringNullableWithAggregatesFilter<"Payment"> | string | null
    paymentMethod?: EnumPaymentMethodWithAggregatesFilter<"Payment"> | $Enums.PaymentMethod
    amount?: FloatWithAggregatesFilter<"Payment"> | number
    currency?: StringWithAggregatesFilter<"Payment"> | string
    status?: EnumPaymentStatusWithAggregatesFilter<"Payment"> | $Enums.PaymentStatus
    signature?: StringNullableWithAggregatesFilter<"Payment"> | string | null
    description?: StringNullableWithAggregatesFilter<"Payment"> | string | null
    paymentGatewayUrl?: StringNullableWithAggregatesFilter<"Payment"> | string | null
    paidAt?: DateTimeNullableWithAggregatesFilter<"Payment"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Payment"> | Date | string
  }

  export type InstallationProgressWhereInput = {
    AND?: InstallationProgressWhereInput | InstallationProgressWhereInput[]
    OR?: InstallationProgressWhereInput[]
    NOT?: InstallationProgressWhereInput | InstallationProgressWhereInput[]
    id?: StringFilter<"InstallationProgress"> | string
    propertyId?: StringFilter<"InstallationProgress"> | string
    paymentConfirmed?: BoolFilter<"InstallationProgress"> | boolean
    paymentConfirmedAt?: DateTimeNullableFilter<"InstallationProgress"> | Date | string | null
    engineerAssigned?: BoolFilter<"InstallationProgress"> | boolean
    engineerName?: StringNullableFilter<"InstallationProgress"> | string | null
    engineerPhone?: StringNullableFilter<"InstallationProgress"> | string | null
    engineerAssignedAt?: DateTimeNullableFilter<"InstallationProgress"> | Date | string | null
    siteSurveyScheduled?: BoolFilter<"InstallationProgress"> | boolean
    siteSurveyDate?: DateTimeNullableFilter<"InstallationProgress"> | Date | string | null
    installationStarted?: BoolFilter<"InstallationProgress"> | boolean
    installationDate?: DateTimeNullableFilter<"InstallationProgress"> | Date | string | null
    systemActivated?: BoolFilter<"InstallationProgress"> | boolean
    activationDate?: DateTimeNullableFilter<"InstallationProgress"> | Date | string | null
    estimatedCompletion?: StringNullableFilter<"InstallationProgress"> | string | null
    updatedAt?: DateTimeFilter<"InstallationProgress"> | Date | string
    property?: XOR<PropertyRelationFilter, PropertyWhereInput>
  }

  export type InstallationProgressOrderByWithRelationInput = {
    id?: SortOrder
    propertyId?: SortOrder
    paymentConfirmed?: SortOrder
    paymentConfirmedAt?: SortOrderInput | SortOrder
    engineerAssigned?: SortOrder
    engineerName?: SortOrderInput | SortOrder
    engineerPhone?: SortOrderInput | SortOrder
    engineerAssignedAt?: SortOrderInput | SortOrder
    siteSurveyScheduled?: SortOrder
    siteSurveyDate?: SortOrderInput | SortOrder
    installationStarted?: SortOrder
    installationDate?: SortOrderInput | SortOrder
    systemActivated?: SortOrder
    activationDate?: SortOrderInput | SortOrder
    estimatedCompletion?: SortOrderInput | SortOrder
    updatedAt?: SortOrder
    property?: PropertyOrderByWithRelationInput
  }

  export type InstallationProgressWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    propertyId?: string
    AND?: InstallationProgressWhereInput | InstallationProgressWhereInput[]
    OR?: InstallationProgressWhereInput[]
    NOT?: InstallationProgressWhereInput | InstallationProgressWhereInput[]
    paymentConfirmed?: BoolFilter<"InstallationProgress"> | boolean
    paymentConfirmedAt?: DateTimeNullableFilter<"InstallationProgress"> | Date | string | null
    engineerAssigned?: BoolFilter<"InstallationProgress"> | boolean
    engineerName?: StringNullableFilter<"InstallationProgress"> | string | null
    engineerPhone?: StringNullableFilter<"InstallationProgress"> | string | null
    engineerAssignedAt?: DateTimeNullableFilter<"InstallationProgress"> | Date | string | null
    siteSurveyScheduled?: BoolFilter<"InstallationProgress"> | boolean
    siteSurveyDate?: DateTimeNullableFilter<"InstallationProgress"> | Date | string | null
    installationStarted?: BoolFilter<"InstallationProgress"> | boolean
    installationDate?: DateTimeNullableFilter<"InstallationProgress"> | Date | string | null
    systemActivated?: BoolFilter<"InstallationProgress"> | boolean
    activationDate?: DateTimeNullableFilter<"InstallationProgress"> | Date | string | null
    estimatedCompletion?: StringNullableFilter<"InstallationProgress"> | string | null
    updatedAt?: DateTimeFilter<"InstallationProgress"> | Date | string
    property?: XOR<PropertyRelationFilter, PropertyWhereInput>
  }, "id" | "propertyId">

  export type InstallationProgressOrderByWithAggregationInput = {
    id?: SortOrder
    propertyId?: SortOrder
    paymentConfirmed?: SortOrder
    paymentConfirmedAt?: SortOrderInput | SortOrder
    engineerAssigned?: SortOrder
    engineerName?: SortOrderInput | SortOrder
    engineerPhone?: SortOrderInput | SortOrder
    engineerAssignedAt?: SortOrderInput | SortOrder
    siteSurveyScheduled?: SortOrder
    siteSurveyDate?: SortOrderInput | SortOrder
    installationStarted?: SortOrder
    installationDate?: SortOrderInput | SortOrder
    systemActivated?: SortOrder
    activationDate?: SortOrderInput | SortOrder
    estimatedCompletion?: SortOrderInput | SortOrder
    updatedAt?: SortOrder
    _count?: InstallationProgressCountOrderByAggregateInput
    _max?: InstallationProgressMaxOrderByAggregateInput
    _min?: InstallationProgressMinOrderByAggregateInput
  }

  export type InstallationProgressScalarWhereWithAggregatesInput = {
    AND?: InstallationProgressScalarWhereWithAggregatesInput | InstallationProgressScalarWhereWithAggregatesInput[]
    OR?: InstallationProgressScalarWhereWithAggregatesInput[]
    NOT?: InstallationProgressScalarWhereWithAggregatesInput | InstallationProgressScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"InstallationProgress"> | string
    propertyId?: StringWithAggregatesFilter<"InstallationProgress"> | string
    paymentConfirmed?: BoolWithAggregatesFilter<"InstallationProgress"> | boolean
    paymentConfirmedAt?: DateTimeNullableWithAggregatesFilter<"InstallationProgress"> | Date | string | null
    engineerAssigned?: BoolWithAggregatesFilter<"InstallationProgress"> | boolean
    engineerName?: StringNullableWithAggregatesFilter<"InstallationProgress"> | string | null
    engineerPhone?: StringNullableWithAggregatesFilter<"InstallationProgress"> | string | null
    engineerAssignedAt?: DateTimeNullableWithAggregatesFilter<"InstallationProgress"> | Date | string | null
    siteSurveyScheduled?: BoolWithAggregatesFilter<"InstallationProgress"> | boolean
    siteSurveyDate?: DateTimeNullableWithAggregatesFilter<"InstallationProgress"> | Date | string | null
    installationStarted?: BoolWithAggregatesFilter<"InstallationProgress"> | boolean
    installationDate?: DateTimeNullableWithAggregatesFilter<"InstallationProgress"> | Date | string | null
    systemActivated?: BoolWithAggregatesFilter<"InstallationProgress"> | boolean
    activationDate?: DateTimeNullableWithAggregatesFilter<"InstallationProgress"> | Date | string | null
    estimatedCompletion?: StringNullableWithAggregatesFilter<"InstallationProgress"> | string | null
    updatedAt?: DateTimeWithAggregatesFilter<"InstallationProgress"> | Date | string
  }

  export type EnergyStatWhereInput = {
    AND?: EnergyStatWhereInput | EnergyStatWhereInput[]
    OR?: EnergyStatWhereInput[]
    NOT?: EnergyStatWhereInput | EnergyStatWhereInput[]
    id?: StringFilter<"EnergyStat"> | string
    propertyId?: StringFilter<"EnergyStat"> | string
    date?: DateTimeFilter<"EnergyStat"> | Date | string
    period?: StringFilter<"EnergyStat"> | string
    production?: FloatFilter<"EnergyStat"> | number
    consumption?: FloatFilter<"EnergyStat"> | number
    gridUsage?: FloatFilter<"EnergyStat"> | number
    batteryPercent?: FloatNullableFilter<"EnergyStat"> | number | null
    solarKw?: FloatNullableFilter<"EnergyStat"> | number | null
    gridKw?: FloatNullableFilter<"EnergyStat"> | number | null
    exporting?: BoolNullableFilter<"EnergyStat"> | boolean | null
    property?: XOR<PropertyRelationFilter, PropertyWhereInput>
  }

  export type EnergyStatOrderByWithRelationInput = {
    id?: SortOrder
    propertyId?: SortOrder
    date?: SortOrder
    period?: SortOrder
    production?: SortOrder
    consumption?: SortOrder
    gridUsage?: SortOrder
    batteryPercent?: SortOrderInput | SortOrder
    solarKw?: SortOrderInput | SortOrder
    gridKw?: SortOrderInput | SortOrder
    exporting?: SortOrderInput | SortOrder
    property?: PropertyOrderByWithRelationInput
  }

  export type EnergyStatWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: EnergyStatWhereInput | EnergyStatWhereInput[]
    OR?: EnergyStatWhereInput[]
    NOT?: EnergyStatWhereInput | EnergyStatWhereInput[]
    propertyId?: StringFilter<"EnergyStat"> | string
    date?: DateTimeFilter<"EnergyStat"> | Date | string
    period?: StringFilter<"EnergyStat"> | string
    production?: FloatFilter<"EnergyStat"> | number
    consumption?: FloatFilter<"EnergyStat"> | number
    gridUsage?: FloatFilter<"EnergyStat"> | number
    batteryPercent?: FloatNullableFilter<"EnergyStat"> | number | null
    solarKw?: FloatNullableFilter<"EnergyStat"> | number | null
    gridKw?: FloatNullableFilter<"EnergyStat"> | number | null
    exporting?: BoolNullableFilter<"EnergyStat"> | boolean | null
    property?: XOR<PropertyRelationFilter, PropertyWhereInput>
  }, "id">

  export type EnergyStatOrderByWithAggregationInput = {
    id?: SortOrder
    propertyId?: SortOrder
    date?: SortOrder
    period?: SortOrder
    production?: SortOrder
    consumption?: SortOrder
    gridUsage?: SortOrder
    batteryPercent?: SortOrderInput | SortOrder
    solarKw?: SortOrderInput | SortOrder
    gridKw?: SortOrderInput | SortOrder
    exporting?: SortOrderInput | SortOrder
    _count?: EnergyStatCountOrderByAggregateInput
    _avg?: EnergyStatAvgOrderByAggregateInput
    _max?: EnergyStatMaxOrderByAggregateInput
    _min?: EnergyStatMinOrderByAggregateInput
    _sum?: EnergyStatSumOrderByAggregateInput
  }

  export type EnergyStatScalarWhereWithAggregatesInput = {
    AND?: EnergyStatScalarWhereWithAggregatesInput | EnergyStatScalarWhereWithAggregatesInput[]
    OR?: EnergyStatScalarWhereWithAggregatesInput[]
    NOT?: EnergyStatScalarWhereWithAggregatesInput | EnergyStatScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"EnergyStat"> | string
    propertyId?: StringWithAggregatesFilter<"EnergyStat"> | string
    date?: DateTimeWithAggregatesFilter<"EnergyStat"> | Date | string
    period?: StringWithAggregatesFilter<"EnergyStat"> | string
    production?: FloatWithAggregatesFilter<"EnergyStat"> | number
    consumption?: FloatWithAggregatesFilter<"EnergyStat"> | number
    gridUsage?: FloatWithAggregatesFilter<"EnergyStat"> | number
    batteryPercent?: FloatNullableWithAggregatesFilter<"EnergyStat"> | number | null
    solarKw?: FloatNullableWithAggregatesFilter<"EnergyStat"> | number | null
    gridKw?: FloatNullableWithAggregatesFilter<"EnergyStat"> | number | null
    exporting?: BoolNullableWithAggregatesFilter<"EnergyStat"> | boolean | null
  }

  export type NotificationWhereInput = {
    AND?: NotificationWhereInput | NotificationWhereInput[]
    OR?: NotificationWhereInput[]
    NOT?: NotificationWhereInput | NotificationWhereInput[]
    id?: StringFilter<"Notification"> | string
    userId?: StringFilter<"Notification"> | string
    type?: StringFilter<"Notification"> | string
    title?: StringFilter<"Notification"> | string
    message?: StringFilter<"Notification"> | string
    route?: StringNullableFilter<"Notification"> | string | null
    read?: BoolFilter<"Notification"> | boolean
    dismissible?: BoolFilter<"Notification"> | boolean
    persistent?: BoolFilter<"Notification"> | boolean
    createdAt?: DateTimeFilter<"Notification"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type NotificationOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    title?: SortOrder
    message?: SortOrder
    route?: SortOrderInput | SortOrder
    read?: SortOrder
    dismissible?: SortOrder
    persistent?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type NotificationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: NotificationWhereInput | NotificationWhereInput[]
    OR?: NotificationWhereInput[]
    NOT?: NotificationWhereInput | NotificationWhereInput[]
    userId?: StringFilter<"Notification"> | string
    type?: StringFilter<"Notification"> | string
    title?: StringFilter<"Notification"> | string
    message?: StringFilter<"Notification"> | string
    route?: StringNullableFilter<"Notification"> | string | null
    read?: BoolFilter<"Notification"> | boolean
    dismissible?: BoolFilter<"Notification"> | boolean
    persistent?: BoolFilter<"Notification"> | boolean
    createdAt?: DateTimeFilter<"Notification"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id">

  export type NotificationOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    title?: SortOrder
    message?: SortOrder
    route?: SortOrderInput | SortOrder
    read?: SortOrder
    dismissible?: SortOrder
    persistent?: SortOrder
    createdAt?: SortOrder
    _count?: NotificationCountOrderByAggregateInput
    _max?: NotificationMaxOrderByAggregateInput
    _min?: NotificationMinOrderByAggregateInput
  }

  export type NotificationScalarWhereWithAggregatesInput = {
    AND?: NotificationScalarWhereWithAggregatesInput | NotificationScalarWhereWithAggregatesInput[]
    OR?: NotificationScalarWhereWithAggregatesInput[]
    NOT?: NotificationScalarWhereWithAggregatesInput | NotificationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Notification"> | string
    userId?: StringWithAggregatesFilter<"Notification"> | string
    type?: StringWithAggregatesFilter<"Notification"> | string
    title?: StringWithAggregatesFilter<"Notification"> | string
    message?: StringWithAggregatesFilter<"Notification"> | string
    route?: StringNullableWithAggregatesFilter<"Notification"> | string | null
    read?: BoolWithAggregatesFilter<"Notification"> | boolean
    dismissible?: BoolWithAggregatesFilter<"Notification"> | boolean
    persistent?: BoolWithAggregatesFilter<"Notification"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Notification"> | Date | string
  }

  export type AlertWhereInput = {
    AND?: AlertWhereInput | AlertWhereInput[]
    OR?: AlertWhereInput[]
    NOT?: AlertWhereInput | AlertWhereInput[]
    id?: StringFilter<"Alert"> | string
    propertyId?: StringFilter<"Alert"> | string
    category?: EnumAlertCategoryFilter<"Alert"> | $Enums.AlertCategory
    severity?: EnumAlertSeverityFilter<"Alert"> | $Enums.AlertSeverity
    title?: StringFilter<"Alert"> | string
    message?: StringFilter<"Alert"> | string
    read?: BoolFilter<"Alert"> | boolean
    createdAt?: DateTimeFilter<"Alert"> | Date | string
    property?: XOR<PropertyRelationFilter, PropertyWhereInput>
  }

  export type AlertOrderByWithRelationInput = {
    id?: SortOrder
    propertyId?: SortOrder
    category?: SortOrder
    severity?: SortOrder
    title?: SortOrder
    message?: SortOrder
    read?: SortOrder
    createdAt?: SortOrder
    property?: PropertyOrderByWithRelationInput
  }

  export type AlertWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AlertWhereInput | AlertWhereInput[]
    OR?: AlertWhereInput[]
    NOT?: AlertWhereInput | AlertWhereInput[]
    propertyId?: StringFilter<"Alert"> | string
    category?: EnumAlertCategoryFilter<"Alert"> | $Enums.AlertCategory
    severity?: EnumAlertSeverityFilter<"Alert"> | $Enums.AlertSeverity
    title?: StringFilter<"Alert"> | string
    message?: StringFilter<"Alert"> | string
    read?: BoolFilter<"Alert"> | boolean
    createdAt?: DateTimeFilter<"Alert"> | Date | string
    property?: XOR<PropertyRelationFilter, PropertyWhereInput>
  }, "id">

  export type AlertOrderByWithAggregationInput = {
    id?: SortOrder
    propertyId?: SortOrder
    category?: SortOrder
    severity?: SortOrder
    title?: SortOrder
    message?: SortOrder
    read?: SortOrder
    createdAt?: SortOrder
    _count?: AlertCountOrderByAggregateInput
    _max?: AlertMaxOrderByAggregateInput
    _min?: AlertMinOrderByAggregateInput
  }

  export type AlertScalarWhereWithAggregatesInput = {
    AND?: AlertScalarWhereWithAggregatesInput | AlertScalarWhereWithAggregatesInput[]
    OR?: AlertScalarWhereWithAggregatesInput[]
    NOT?: AlertScalarWhereWithAggregatesInput | AlertScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Alert"> | string
    propertyId?: StringWithAggregatesFilter<"Alert"> | string
    category?: EnumAlertCategoryWithAggregatesFilter<"Alert"> | $Enums.AlertCategory
    severity?: EnumAlertSeverityWithAggregatesFilter<"Alert"> | $Enums.AlertSeverity
    title?: StringWithAggregatesFilter<"Alert"> | string
    message?: StringWithAggregatesFilter<"Alert"> | string
    read?: BoolWithAggregatesFilter<"Alert"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Alert"> | Date | string
  }

  export type BillWhereInput = {
    AND?: BillWhereInput | BillWhereInput[]
    OR?: BillWhereInput[]
    NOT?: BillWhereInput | BillWhereInput[]
    id?: StringFilter<"Bill"> | string
    propertyId?: StringFilter<"Bill"> | string
    month?: StringFilter<"Bill"> | string
    totalAmount?: FloatFilter<"Bill"> | number
    subscriptionFee?: FloatFilter<"Bill"> | number
    usageCharge?: FloatFilter<"Bill"> | number
    taxes?: FloatFilter<"Bill"> | number
    status?: EnumBillStatusFilter<"Bill"> | $Enums.BillStatus
    dueDate?: DateTimeFilter<"Bill"> | Date | string
    generatedAt?: DateTimeFilter<"Bill"> | Date | string
    paidDate?: DateTimeNullableFilter<"Bill"> | Date | string | null
    pdfUrl?: StringNullableFilter<"Bill"> | string | null
    property?: XOR<PropertyRelationFilter, PropertyWhereInput>
  }

  export type BillOrderByWithRelationInput = {
    id?: SortOrder
    propertyId?: SortOrder
    month?: SortOrder
    totalAmount?: SortOrder
    subscriptionFee?: SortOrder
    usageCharge?: SortOrder
    taxes?: SortOrder
    status?: SortOrder
    dueDate?: SortOrder
    generatedAt?: SortOrder
    paidDate?: SortOrderInput | SortOrder
    pdfUrl?: SortOrderInput | SortOrder
    property?: PropertyOrderByWithRelationInput
  }

  export type BillWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: BillWhereInput | BillWhereInput[]
    OR?: BillWhereInput[]
    NOT?: BillWhereInput | BillWhereInput[]
    propertyId?: StringFilter<"Bill"> | string
    month?: StringFilter<"Bill"> | string
    totalAmount?: FloatFilter<"Bill"> | number
    subscriptionFee?: FloatFilter<"Bill"> | number
    usageCharge?: FloatFilter<"Bill"> | number
    taxes?: FloatFilter<"Bill"> | number
    status?: EnumBillStatusFilter<"Bill"> | $Enums.BillStatus
    dueDate?: DateTimeFilter<"Bill"> | Date | string
    generatedAt?: DateTimeFilter<"Bill"> | Date | string
    paidDate?: DateTimeNullableFilter<"Bill"> | Date | string | null
    pdfUrl?: StringNullableFilter<"Bill"> | string | null
    property?: XOR<PropertyRelationFilter, PropertyWhereInput>
  }, "id">

  export type BillOrderByWithAggregationInput = {
    id?: SortOrder
    propertyId?: SortOrder
    month?: SortOrder
    totalAmount?: SortOrder
    subscriptionFee?: SortOrder
    usageCharge?: SortOrder
    taxes?: SortOrder
    status?: SortOrder
    dueDate?: SortOrder
    generatedAt?: SortOrder
    paidDate?: SortOrderInput | SortOrder
    pdfUrl?: SortOrderInput | SortOrder
    _count?: BillCountOrderByAggregateInput
    _avg?: BillAvgOrderByAggregateInput
    _max?: BillMaxOrderByAggregateInput
    _min?: BillMinOrderByAggregateInput
    _sum?: BillSumOrderByAggregateInput
  }

  export type BillScalarWhereWithAggregatesInput = {
    AND?: BillScalarWhereWithAggregatesInput | BillScalarWhereWithAggregatesInput[]
    OR?: BillScalarWhereWithAggregatesInput[]
    NOT?: BillScalarWhereWithAggregatesInput | BillScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Bill"> | string
    propertyId?: StringWithAggregatesFilter<"Bill"> | string
    month?: StringWithAggregatesFilter<"Bill"> | string
    totalAmount?: FloatWithAggregatesFilter<"Bill"> | number
    subscriptionFee?: FloatWithAggregatesFilter<"Bill"> | number
    usageCharge?: FloatWithAggregatesFilter<"Bill"> | number
    taxes?: FloatWithAggregatesFilter<"Bill"> | number
    status?: EnumBillStatusWithAggregatesFilter<"Bill"> | $Enums.BillStatus
    dueDate?: DateTimeWithAggregatesFilter<"Bill"> | Date | string
    generatedAt?: DateTimeWithAggregatesFilter<"Bill"> | Date | string
    paidDate?: DateTimeNullableWithAggregatesFilter<"Bill"> | Date | string | null
    pdfUrl?: StringNullableWithAggregatesFilter<"Bill"> | string | null
  }

  export type SupportTicketWhereInput = {
    AND?: SupportTicketWhereInput | SupportTicketWhereInput[]
    OR?: SupportTicketWhereInput[]
    NOT?: SupportTicketWhereInput | SupportTicketWhereInput[]
    id?: StringFilter<"SupportTicket"> | string
    userId?: StringFilter<"SupportTicket"> | string
    propertyId?: StringFilter<"SupportTicket"> | string
    category?: EnumTicketCategoryFilter<"SupportTicket"> | $Enums.TicketCategory
    priority?: EnumTicketPriorityFilter<"SupportTicket"> | $Enums.TicketPriority
    status?: EnumTicketStatusFilter<"SupportTicket"> | $Enums.TicketStatus
    title?: StringFilter<"SupportTicket"> | string
    description?: StringFilter<"SupportTicket"> | string
    estimatedResponse?: StringNullableFilter<"SupportTicket"> | string | null
    createdAt?: DateTimeFilter<"SupportTicket"> | Date | string
    updatedAt?: DateTimeFilter<"SupportTicket"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    property?: XOR<PropertyRelationFilter, PropertyWhereInput>
  }

  export type SupportTicketOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    propertyId?: SortOrder
    category?: SortOrder
    priority?: SortOrder
    status?: SortOrder
    title?: SortOrder
    description?: SortOrder
    estimatedResponse?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    property?: PropertyOrderByWithRelationInput
  }

  export type SupportTicketWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SupportTicketWhereInput | SupportTicketWhereInput[]
    OR?: SupportTicketWhereInput[]
    NOT?: SupportTicketWhereInput | SupportTicketWhereInput[]
    userId?: StringFilter<"SupportTicket"> | string
    propertyId?: StringFilter<"SupportTicket"> | string
    category?: EnumTicketCategoryFilter<"SupportTicket"> | $Enums.TicketCategory
    priority?: EnumTicketPriorityFilter<"SupportTicket"> | $Enums.TicketPriority
    status?: EnumTicketStatusFilter<"SupportTicket"> | $Enums.TicketStatus
    title?: StringFilter<"SupportTicket"> | string
    description?: StringFilter<"SupportTicket"> | string
    estimatedResponse?: StringNullableFilter<"SupportTicket"> | string | null
    createdAt?: DateTimeFilter<"SupportTicket"> | Date | string
    updatedAt?: DateTimeFilter<"SupportTicket"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    property?: XOR<PropertyRelationFilter, PropertyWhereInput>
  }, "id">

  export type SupportTicketOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    propertyId?: SortOrder
    category?: SortOrder
    priority?: SortOrder
    status?: SortOrder
    title?: SortOrder
    description?: SortOrder
    estimatedResponse?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SupportTicketCountOrderByAggregateInput
    _max?: SupportTicketMaxOrderByAggregateInput
    _min?: SupportTicketMinOrderByAggregateInput
  }

  export type SupportTicketScalarWhereWithAggregatesInput = {
    AND?: SupportTicketScalarWhereWithAggregatesInput | SupportTicketScalarWhereWithAggregatesInput[]
    OR?: SupportTicketScalarWhereWithAggregatesInput[]
    NOT?: SupportTicketScalarWhereWithAggregatesInput | SupportTicketScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SupportTicket"> | string
    userId?: StringWithAggregatesFilter<"SupportTicket"> | string
    propertyId?: StringWithAggregatesFilter<"SupportTicket"> | string
    category?: EnumTicketCategoryWithAggregatesFilter<"SupportTicket"> | $Enums.TicketCategory
    priority?: EnumTicketPriorityWithAggregatesFilter<"SupportTicket"> | $Enums.TicketPriority
    status?: EnumTicketStatusWithAggregatesFilter<"SupportTicket"> | $Enums.TicketStatus
    title?: StringWithAggregatesFilter<"SupportTicket"> | string
    description?: StringWithAggregatesFilter<"SupportTicket"> | string
    estimatedResponse?: StringNullableWithAggregatesFilter<"SupportTicket"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"SupportTicket"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"SupportTicket"> | Date | string
  }

  export type AIMessageWhereInput = {
    AND?: AIMessageWhereInput | AIMessageWhereInput[]
    OR?: AIMessageWhereInput[]
    NOT?: AIMessageWhereInput | AIMessageWhereInput[]
    id?: StringFilter<"AIMessage"> | string
    userId?: StringFilter<"AIMessage"> | string
    propertyId?: StringFilter<"AIMessage"> | string
    role?: EnumChatRoleFilter<"AIMessage"> | $Enums.ChatRole
    content?: StringFilter<"AIMessage"> | string
    createdAt?: DateTimeFilter<"AIMessage"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    property?: XOR<PropertyRelationFilter, PropertyWhereInput>
  }

  export type AIMessageOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    propertyId?: SortOrder
    role?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    property?: PropertyOrderByWithRelationInput
  }

  export type AIMessageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AIMessageWhereInput | AIMessageWhereInput[]
    OR?: AIMessageWhereInput[]
    NOT?: AIMessageWhereInput | AIMessageWhereInput[]
    userId?: StringFilter<"AIMessage"> | string
    propertyId?: StringFilter<"AIMessage"> | string
    role?: EnumChatRoleFilter<"AIMessage"> | $Enums.ChatRole
    content?: StringFilter<"AIMessage"> | string
    createdAt?: DateTimeFilter<"AIMessage"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    property?: XOR<PropertyRelationFilter, PropertyWhereInput>
  }, "id">

  export type AIMessageOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    propertyId?: SortOrder
    role?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    _count?: AIMessageCountOrderByAggregateInput
    _max?: AIMessageMaxOrderByAggregateInput
    _min?: AIMessageMinOrderByAggregateInput
  }

  export type AIMessageScalarWhereWithAggregatesInput = {
    AND?: AIMessageScalarWhereWithAggregatesInput | AIMessageScalarWhereWithAggregatesInput[]
    OR?: AIMessageScalarWhereWithAggregatesInput[]
    NOT?: AIMessageScalarWhereWithAggregatesInput | AIMessageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AIMessage"> | string
    userId?: StringWithAggregatesFilter<"AIMessage"> | string
    propertyId?: StringWithAggregatesFilter<"AIMessage"> | string
    role?: EnumChatRoleWithAggregatesFilter<"AIMessage"> | $Enums.ChatRole
    content?: StringWithAggregatesFilter<"AIMessage"> | string
    createdAt?: DateTimeWithAggregatesFilter<"AIMessage"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    password: string
    name: string
    phone?: string | null
    address?: string | null
    role?: $Enums.Role
    isActive?: boolean
    currentPropertyId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    refreshTokens?: RefreshTokenCreateNestedManyWithoutUserInput
    properties?: PropertyCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    supportTickets?: SupportTicketCreateNestedManyWithoutUserInput
    aiMessages?: AIMessageCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    password: string
    name: string
    phone?: string | null
    address?: string | null
    role?: $Enums.Role
    isActive?: boolean
    currentPropertyId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput
    properties?: PropertyUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    supportTickets?: SupportTicketUncheckedCreateNestedManyWithoutUserInput
    aiMessages?: AIMessageUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    currentPropertyId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    refreshTokens?: RefreshTokenUpdateManyWithoutUserNestedInput
    properties?: PropertyUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    supportTickets?: SupportTicketUpdateManyWithoutUserNestedInput
    aiMessages?: AIMessageUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    currentPropertyId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
    properties?: PropertyUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    supportTickets?: SupportTicketUncheckedUpdateManyWithoutUserNestedInput
    aiMessages?: AIMessageUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    password: string
    name: string
    phone?: string | null
    address?: string | null
    role?: $Enums.Role
    isActive?: boolean
    currentPropertyId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    currentPropertyId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    currentPropertyId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefreshTokenCreateInput = {
    id?: string
    token: string
    expiresAt: Date | string
    createdAt?: Date | string
    isRevoked?: boolean
    user: UserCreateNestedOneWithoutRefreshTokensInput
  }

  export type RefreshTokenUncheckedCreateInput = {
    id?: string
    token: string
    userId: string
    expiresAt: Date | string
    createdAt?: Date | string
    isRevoked?: boolean
  }

  export type RefreshTokenUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isRevoked?: BoolFieldUpdateOperationsInput | boolean
    user?: UserUpdateOneRequiredWithoutRefreshTokensNestedInput
  }

  export type RefreshTokenUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isRevoked?: BoolFieldUpdateOperationsInput | boolean
  }

  export type RefreshTokenCreateManyInput = {
    id?: string
    token: string
    userId: string
    expiresAt: Date | string
    createdAt?: Date | string
    isRevoked?: boolean
  }

  export type RefreshTokenUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isRevoked?: BoolFieldUpdateOperationsInput | boolean
  }

  export type RefreshTokenUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isRevoked?: BoolFieldUpdateOperationsInput | boolean
  }

  export type PropertyCreateInput = {
    id?: string
    name: string
    address: string
    type: $Enums.PropertyType
    subscriptionStatus?: $Enums.SubscriptionStatus
    planType?: string | null
    solarCapacity?: number | null
    batteryStorage?: number | null
    installationDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutPropertiesInput
    surveys?: SurveyCreateNestedManyWithoutPropertyInput
    proposals?: ProposalCreateNestedManyWithoutPropertyInput
    payments?: PaymentCreateNestedManyWithoutPropertyInput
    installation?: InstallationProgressCreateNestedOneWithoutPropertyInput
    energyStats?: EnergyStatCreateNestedManyWithoutPropertyInput
    alerts?: AlertCreateNestedManyWithoutPropertyInput
    bills?: BillCreateNestedManyWithoutPropertyInput
    supportTickets?: SupportTicketCreateNestedManyWithoutPropertyInput
    aiMessages?: AIMessageCreateNestedManyWithoutPropertyInput
  }

  export type PropertyUncheckedCreateInput = {
    id?: string
    userId: string
    name: string
    address: string
    type: $Enums.PropertyType
    subscriptionStatus?: $Enums.SubscriptionStatus
    planType?: string | null
    solarCapacity?: number | null
    batteryStorage?: number | null
    installationDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    surveys?: SurveyUncheckedCreateNestedManyWithoutPropertyInput
    proposals?: ProposalUncheckedCreateNestedManyWithoutPropertyInput
    payments?: PaymentUncheckedCreateNestedManyWithoutPropertyInput
    installation?: InstallationProgressUncheckedCreateNestedOneWithoutPropertyInput
    energyStats?: EnergyStatUncheckedCreateNestedManyWithoutPropertyInput
    alerts?: AlertUncheckedCreateNestedManyWithoutPropertyInput
    bills?: BillUncheckedCreateNestedManyWithoutPropertyInput
    supportTickets?: SupportTicketUncheckedCreateNestedManyWithoutPropertyInput
    aiMessages?: AIMessageUncheckedCreateNestedManyWithoutPropertyInput
  }

  export type PropertyUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    type?: EnumPropertyTypeFieldUpdateOperationsInput | $Enums.PropertyType
    subscriptionStatus?: EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus
    planType?: NullableStringFieldUpdateOperationsInput | string | null
    solarCapacity?: NullableFloatFieldUpdateOperationsInput | number | null
    batteryStorage?: NullableFloatFieldUpdateOperationsInput | number | null
    installationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPropertiesNestedInput
    surveys?: SurveyUpdateManyWithoutPropertyNestedInput
    proposals?: ProposalUpdateManyWithoutPropertyNestedInput
    payments?: PaymentUpdateManyWithoutPropertyNestedInput
    installation?: InstallationProgressUpdateOneWithoutPropertyNestedInput
    energyStats?: EnergyStatUpdateManyWithoutPropertyNestedInput
    alerts?: AlertUpdateManyWithoutPropertyNestedInput
    bills?: BillUpdateManyWithoutPropertyNestedInput
    supportTickets?: SupportTicketUpdateManyWithoutPropertyNestedInput
    aiMessages?: AIMessageUpdateManyWithoutPropertyNestedInput
  }

  export type PropertyUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    type?: EnumPropertyTypeFieldUpdateOperationsInput | $Enums.PropertyType
    subscriptionStatus?: EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus
    planType?: NullableStringFieldUpdateOperationsInput | string | null
    solarCapacity?: NullableFloatFieldUpdateOperationsInput | number | null
    batteryStorage?: NullableFloatFieldUpdateOperationsInput | number | null
    installationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    surveys?: SurveyUncheckedUpdateManyWithoutPropertyNestedInput
    proposals?: ProposalUncheckedUpdateManyWithoutPropertyNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutPropertyNestedInput
    installation?: InstallationProgressUncheckedUpdateOneWithoutPropertyNestedInput
    energyStats?: EnergyStatUncheckedUpdateManyWithoutPropertyNestedInput
    alerts?: AlertUncheckedUpdateManyWithoutPropertyNestedInput
    bills?: BillUncheckedUpdateManyWithoutPropertyNestedInput
    supportTickets?: SupportTicketUncheckedUpdateManyWithoutPropertyNestedInput
    aiMessages?: AIMessageUncheckedUpdateManyWithoutPropertyNestedInput
  }

  export type PropertyCreateManyInput = {
    id?: string
    userId: string
    name: string
    address: string
    type: $Enums.PropertyType
    subscriptionStatus?: $Enums.SubscriptionStatus
    planType?: string | null
    solarCapacity?: number | null
    batteryStorage?: number | null
    installationDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PropertyUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    type?: EnumPropertyTypeFieldUpdateOperationsInput | $Enums.PropertyType
    subscriptionStatus?: EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus
    planType?: NullableStringFieldUpdateOperationsInput | string | null
    solarCapacity?: NullableFloatFieldUpdateOperationsInput | number | null
    batteryStorage?: NullableFloatFieldUpdateOperationsInput | number | null
    installationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PropertyUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    type?: EnumPropertyTypeFieldUpdateOperationsInput | $Enums.PropertyType
    subscriptionStatus?: EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus
    planType?: NullableStringFieldUpdateOperationsInput | string | null
    solarCapacity?: NullableFloatFieldUpdateOperationsInput | number | null
    batteryStorage?: NullableFloatFieldUpdateOperationsInput | number | null
    installationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SurveyCreateInput = {
    id?: string
    propertyType: $Enums.PropertyType
    roofArea: number
    monthlyBill: number
    monthlyConsumption: number
    peakHours: string
    occupants: number
    appliances?: SurveyCreateappliancesInput | string[]
    status?: string
    submittedAt?: Date | string
    property: PropertyCreateNestedOneWithoutSurveysInput
  }

  export type SurveyUncheckedCreateInput = {
    id?: string
    propertyId: string
    propertyType: $Enums.PropertyType
    roofArea: number
    monthlyBill: number
    monthlyConsumption: number
    peakHours: string
    occupants: number
    appliances?: SurveyCreateappliancesInput | string[]
    status?: string
    submittedAt?: Date | string
  }

  export type SurveyUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    propertyType?: EnumPropertyTypeFieldUpdateOperationsInput | $Enums.PropertyType
    roofArea?: FloatFieldUpdateOperationsInput | number
    monthlyBill?: FloatFieldUpdateOperationsInput | number
    monthlyConsumption?: FloatFieldUpdateOperationsInput | number
    peakHours?: StringFieldUpdateOperationsInput | string
    occupants?: IntFieldUpdateOperationsInput | number
    appliances?: SurveyUpdateappliancesInput | string[]
    status?: StringFieldUpdateOperationsInput | string
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    property?: PropertyUpdateOneRequiredWithoutSurveysNestedInput
  }

  export type SurveyUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    propertyType?: EnumPropertyTypeFieldUpdateOperationsInput | $Enums.PropertyType
    roofArea?: FloatFieldUpdateOperationsInput | number
    monthlyBill?: FloatFieldUpdateOperationsInput | number
    monthlyConsumption?: FloatFieldUpdateOperationsInput | number
    peakHours?: StringFieldUpdateOperationsInput | string
    occupants?: IntFieldUpdateOperationsInput | number
    appliances?: SurveyUpdateappliancesInput | string[]
    status?: StringFieldUpdateOperationsInput | string
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SurveyCreateManyInput = {
    id?: string
    propertyId: string
    propertyType: $Enums.PropertyType
    roofArea: number
    monthlyBill: number
    monthlyConsumption: number
    peakHours: string
    occupants: number
    appliances?: SurveyCreateappliancesInput | string[]
    status?: string
    submittedAt?: Date | string
  }

  export type SurveyUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    propertyType?: EnumPropertyTypeFieldUpdateOperationsInput | $Enums.PropertyType
    roofArea?: FloatFieldUpdateOperationsInput | number
    monthlyBill?: FloatFieldUpdateOperationsInput | number
    monthlyConsumption?: FloatFieldUpdateOperationsInput | number
    peakHours?: StringFieldUpdateOperationsInput | string
    occupants?: IntFieldUpdateOperationsInput | number
    appliances?: SurveyUpdateappliancesInput | string[]
    status?: StringFieldUpdateOperationsInput | string
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SurveyUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    propertyType?: EnumPropertyTypeFieldUpdateOperationsInput | $Enums.PropertyType
    roofArea?: FloatFieldUpdateOperationsInput | number
    monthlyBill?: FloatFieldUpdateOperationsInput | number
    monthlyConsumption?: FloatFieldUpdateOperationsInput | number
    peakHours?: StringFieldUpdateOperationsInput | string
    occupants?: IntFieldUpdateOperationsInput | number
    appliances?: SurveyUpdateappliancesInput | string[]
    status?: StringFieldUpdateOperationsInput | string
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProposalCreateInput = {
    id?: string
    surveyId: string
    solarCapacity: number
    batteryStorage: number
    monthlyFee: number
    estimatedSavings: number
    estimatedProduction: number
    contractDuration: number
    installationFee: number
    securityDeposit: number
    whatsIncluded?: ProposalCreatewhatsIncludedInput | string[]
    generatedAt?: Date | string
    expiresAt: Date | string
    property: PropertyCreateNestedOneWithoutProposalsInput
  }

  export type ProposalUncheckedCreateInput = {
    id?: string
    propertyId: string
    surveyId: string
    solarCapacity: number
    batteryStorage: number
    monthlyFee: number
    estimatedSavings: number
    estimatedProduction: number
    contractDuration: number
    installationFee: number
    securityDeposit: number
    whatsIncluded?: ProposalCreatewhatsIncludedInput | string[]
    generatedAt?: Date | string
    expiresAt: Date | string
  }

  export type ProposalUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    surveyId?: StringFieldUpdateOperationsInput | string
    solarCapacity?: FloatFieldUpdateOperationsInput | number
    batteryStorage?: FloatFieldUpdateOperationsInput | number
    monthlyFee?: FloatFieldUpdateOperationsInput | number
    estimatedSavings?: FloatFieldUpdateOperationsInput | number
    estimatedProduction?: FloatFieldUpdateOperationsInput | number
    contractDuration?: IntFieldUpdateOperationsInput | number
    installationFee?: FloatFieldUpdateOperationsInput | number
    securityDeposit?: FloatFieldUpdateOperationsInput | number
    whatsIncluded?: ProposalUpdatewhatsIncludedInput | string[]
    generatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    property?: PropertyUpdateOneRequiredWithoutProposalsNestedInput
  }

  export type ProposalUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    surveyId?: StringFieldUpdateOperationsInput | string
    solarCapacity?: FloatFieldUpdateOperationsInput | number
    batteryStorage?: FloatFieldUpdateOperationsInput | number
    monthlyFee?: FloatFieldUpdateOperationsInput | number
    estimatedSavings?: FloatFieldUpdateOperationsInput | number
    estimatedProduction?: FloatFieldUpdateOperationsInput | number
    contractDuration?: IntFieldUpdateOperationsInput | number
    installationFee?: FloatFieldUpdateOperationsInput | number
    securityDeposit?: FloatFieldUpdateOperationsInput | number
    whatsIncluded?: ProposalUpdatewhatsIncludedInput | string[]
    generatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProposalCreateManyInput = {
    id?: string
    propertyId: string
    surveyId: string
    solarCapacity: number
    batteryStorage: number
    monthlyFee: number
    estimatedSavings: number
    estimatedProduction: number
    contractDuration: number
    installationFee: number
    securityDeposit: number
    whatsIncluded?: ProposalCreatewhatsIncludedInput | string[]
    generatedAt?: Date | string
    expiresAt: Date | string
  }

  export type ProposalUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    surveyId?: StringFieldUpdateOperationsInput | string
    solarCapacity?: FloatFieldUpdateOperationsInput | number
    batteryStorage?: FloatFieldUpdateOperationsInput | number
    monthlyFee?: FloatFieldUpdateOperationsInput | number
    estimatedSavings?: FloatFieldUpdateOperationsInput | number
    estimatedProduction?: FloatFieldUpdateOperationsInput | number
    contractDuration?: IntFieldUpdateOperationsInput | number
    installationFee?: FloatFieldUpdateOperationsInput | number
    securityDeposit?: FloatFieldUpdateOperationsInput | number
    whatsIncluded?: ProposalUpdatewhatsIncludedInput | string[]
    generatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProposalUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    surveyId?: StringFieldUpdateOperationsInput | string
    solarCapacity?: FloatFieldUpdateOperationsInput | number
    batteryStorage?: FloatFieldUpdateOperationsInput | number
    monthlyFee?: FloatFieldUpdateOperationsInput | number
    estimatedSavings?: FloatFieldUpdateOperationsInput | number
    estimatedProduction?: FloatFieldUpdateOperationsInput | number
    contractDuration?: IntFieldUpdateOperationsInput | number
    installationFee?: FloatFieldUpdateOperationsInput | number
    securityDeposit?: FloatFieldUpdateOperationsInput | number
    whatsIncluded?: ProposalUpdatewhatsIncludedInput | string[]
    generatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentCreateInput = {
    id?: string
    proposalId?: string | null
    orderId: string
    transactionId?: string | null
    paymentMethod: $Enums.PaymentMethod
    amount: number
    currency?: string
    status?: $Enums.PaymentStatus
    signature?: string | null
    description?: string | null
    paymentGatewayUrl?: string | null
    paidAt?: Date | string | null
    createdAt?: Date | string
    property: PropertyCreateNestedOneWithoutPaymentsInput
  }

  export type PaymentUncheckedCreateInput = {
    id?: string
    propertyId: string
    proposalId?: string | null
    orderId: string
    transactionId?: string | null
    paymentMethod: $Enums.PaymentMethod
    amount: number
    currency?: string
    status?: $Enums.PaymentStatus
    signature?: string | null
    description?: string | null
    paymentGatewayUrl?: string | null
    paidAt?: Date | string | null
    createdAt?: Date | string
  }

  export type PaymentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    proposalId?: NullableStringFieldUpdateOperationsInput | string | null
    orderId?: StringFieldUpdateOperationsInput | string
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    amount?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    signature?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    paymentGatewayUrl?: NullableStringFieldUpdateOperationsInput | string | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    property?: PropertyUpdateOneRequiredWithoutPaymentsNestedInput
  }

  export type PaymentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    proposalId?: NullableStringFieldUpdateOperationsInput | string | null
    orderId?: StringFieldUpdateOperationsInput | string
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    amount?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    signature?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    paymentGatewayUrl?: NullableStringFieldUpdateOperationsInput | string | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentCreateManyInput = {
    id?: string
    propertyId: string
    proposalId?: string | null
    orderId: string
    transactionId?: string | null
    paymentMethod: $Enums.PaymentMethod
    amount: number
    currency?: string
    status?: $Enums.PaymentStatus
    signature?: string | null
    description?: string | null
    paymentGatewayUrl?: string | null
    paidAt?: Date | string | null
    createdAt?: Date | string
  }

  export type PaymentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    proposalId?: NullableStringFieldUpdateOperationsInput | string | null
    orderId?: StringFieldUpdateOperationsInput | string
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    amount?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    signature?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    paymentGatewayUrl?: NullableStringFieldUpdateOperationsInput | string | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    proposalId?: NullableStringFieldUpdateOperationsInput | string | null
    orderId?: StringFieldUpdateOperationsInput | string
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    amount?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    signature?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    paymentGatewayUrl?: NullableStringFieldUpdateOperationsInput | string | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InstallationProgressCreateInput = {
    id?: string
    paymentConfirmed?: boolean
    paymentConfirmedAt?: Date | string | null
    engineerAssigned?: boolean
    engineerName?: string | null
    engineerPhone?: string | null
    engineerAssignedAt?: Date | string | null
    siteSurveyScheduled?: boolean
    siteSurveyDate?: Date | string | null
    installationStarted?: boolean
    installationDate?: Date | string | null
    systemActivated?: boolean
    activationDate?: Date | string | null
    estimatedCompletion?: string | null
    updatedAt?: Date | string
    property: PropertyCreateNestedOneWithoutInstallationInput
  }

  export type InstallationProgressUncheckedCreateInput = {
    id?: string
    propertyId: string
    paymentConfirmed?: boolean
    paymentConfirmedAt?: Date | string | null
    engineerAssigned?: boolean
    engineerName?: string | null
    engineerPhone?: string | null
    engineerAssignedAt?: Date | string | null
    siteSurveyScheduled?: boolean
    siteSurveyDate?: Date | string | null
    installationStarted?: boolean
    installationDate?: Date | string | null
    systemActivated?: boolean
    activationDate?: Date | string | null
    estimatedCompletion?: string | null
    updatedAt?: Date | string
  }

  export type InstallationProgressUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    paymentConfirmed?: BoolFieldUpdateOperationsInput | boolean
    paymentConfirmedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    engineerAssigned?: BoolFieldUpdateOperationsInput | boolean
    engineerName?: NullableStringFieldUpdateOperationsInput | string | null
    engineerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    engineerAssignedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    siteSurveyScheduled?: BoolFieldUpdateOperationsInput | boolean
    siteSurveyDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    installationStarted?: BoolFieldUpdateOperationsInput | boolean
    installationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    systemActivated?: BoolFieldUpdateOperationsInput | boolean
    activationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estimatedCompletion?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    property?: PropertyUpdateOneRequiredWithoutInstallationNestedInput
  }

  export type InstallationProgressUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    paymentConfirmed?: BoolFieldUpdateOperationsInput | boolean
    paymentConfirmedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    engineerAssigned?: BoolFieldUpdateOperationsInput | boolean
    engineerName?: NullableStringFieldUpdateOperationsInput | string | null
    engineerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    engineerAssignedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    siteSurveyScheduled?: BoolFieldUpdateOperationsInput | boolean
    siteSurveyDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    installationStarted?: BoolFieldUpdateOperationsInput | boolean
    installationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    systemActivated?: BoolFieldUpdateOperationsInput | boolean
    activationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estimatedCompletion?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InstallationProgressCreateManyInput = {
    id?: string
    propertyId: string
    paymentConfirmed?: boolean
    paymentConfirmedAt?: Date | string | null
    engineerAssigned?: boolean
    engineerName?: string | null
    engineerPhone?: string | null
    engineerAssignedAt?: Date | string | null
    siteSurveyScheduled?: boolean
    siteSurveyDate?: Date | string | null
    installationStarted?: boolean
    installationDate?: Date | string | null
    systemActivated?: boolean
    activationDate?: Date | string | null
    estimatedCompletion?: string | null
    updatedAt?: Date | string
  }

  export type InstallationProgressUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    paymentConfirmed?: BoolFieldUpdateOperationsInput | boolean
    paymentConfirmedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    engineerAssigned?: BoolFieldUpdateOperationsInput | boolean
    engineerName?: NullableStringFieldUpdateOperationsInput | string | null
    engineerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    engineerAssignedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    siteSurveyScheduled?: BoolFieldUpdateOperationsInput | boolean
    siteSurveyDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    installationStarted?: BoolFieldUpdateOperationsInput | boolean
    installationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    systemActivated?: BoolFieldUpdateOperationsInput | boolean
    activationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estimatedCompletion?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InstallationProgressUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    paymentConfirmed?: BoolFieldUpdateOperationsInput | boolean
    paymentConfirmedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    engineerAssigned?: BoolFieldUpdateOperationsInput | boolean
    engineerName?: NullableStringFieldUpdateOperationsInput | string | null
    engineerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    engineerAssignedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    siteSurveyScheduled?: BoolFieldUpdateOperationsInput | boolean
    siteSurveyDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    installationStarted?: BoolFieldUpdateOperationsInput | boolean
    installationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    systemActivated?: BoolFieldUpdateOperationsInput | boolean
    activationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estimatedCompletion?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EnergyStatCreateInput = {
    id?: string
    date?: Date | string
    period: string
    production: number
    consumption: number
    gridUsage: number
    batteryPercent?: number | null
    solarKw?: number | null
    gridKw?: number | null
    exporting?: boolean | null
    property: PropertyCreateNestedOneWithoutEnergyStatsInput
  }

  export type EnergyStatUncheckedCreateInput = {
    id?: string
    propertyId: string
    date?: Date | string
    period: string
    production: number
    consumption: number
    gridUsage: number
    batteryPercent?: number | null
    solarKw?: number | null
    gridKw?: number | null
    exporting?: boolean | null
  }

  export type EnergyStatUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    period?: StringFieldUpdateOperationsInput | string
    production?: FloatFieldUpdateOperationsInput | number
    consumption?: FloatFieldUpdateOperationsInput | number
    gridUsage?: FloatFieldUpdateOperationsInput | number
    batteryPercent?: NullableFloatFieldUpdateOperationsInput | number | null
    solarKw?: NullableFloatFieldUpdateOperationsInput | number | null
    gridKw?: NullableFloatFieldUpdateOperationsInput | number | null
    exporting?: NullableBoolFieldUpdateOperationsInput | boolean | null
    property?: PropertyUpdateOneRequiredWithoutEnergyStatsNestedInput
  }

  export type EnergyStatUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    period?: StringFieldUpdateOperationsInput | string
    production?: FloatFieldUpdateOperationsInput | number
    consumption?: FloatFieldUpdateOperationsInput | number
    gridUsage?: FloatFieldUpdateOperationsInput | number
    batteryPercent?: NullableFloatFieldUpdateOperationsInput | number | null
    solarKw?: NullableFloatFieldUpdateOperationsInput | number | null
    gridKw?: NullableFloatFieldUpdateOperationsInput | number | null
    exporting?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type EnergyStatCreateManyInput = {
    id?: string
    propertyId: string
    date?: Date | string
    period: string
    production: number
    consumption: number
    gridUsage: number
    batteryPercent?: number | null
    solarKw?: number | null
    gridKw?: number | null
    exporting?: boolean | null
  }

  export type EnergyStatUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    period?: StringFieldUpdateOperationsInput | string
    production?: FloatFieldUpdateOperationsInput | number
    consumption?: FloatFieldUpdateOperationsInput | number
    gridUsage?: FloatFieldUpdateOperationsInput | number
    batteryPercent?: NullableFloatFieldUpdateOperationsInput | number | null
    solarKw?: NullableFloatFieldUpdateOperationsInput | number | null
    gridKw?: NullableFloatFieldUpdateOperationsInput | number | null
    exporting?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type EnergyStatUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    period?: StringFieldUpdateOperationsInput | string
    production?: FloatFieldUpdateOperationsInput | number
    consumption?: FloatFieldUpdateOperationsInput | number
    gridUsage?: FloatFieldUpdateOperationsInput | number
    batteryPercent?: NullableFloatFieldUpdateOperationsInput | number | null
    solarKw?: NullableFloatFieldUpdateOperationsInput | number | null
    gridKw?: NullableFloatFieldUpdateOperationsInput | number | null
    exporting?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type NotificationCreateInput = {
    id?: string
    type: string
    title: string
    message: string
    route?: string | null
    read?: boolean
    dismissible?: boolean
    persistent?: boolean
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutNotificationsInput
  }

  export type NotificationUncheckedCreateInput = {
    id?: string
    userId: string
    type: string
    title: string
    message: string
    route?: string | null
    read?: boolean
    dismissible?: boolean
    persistent?: boolean
    createdAt?: Date | string
  }

  export type NotificationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    route?: NullableStringFieldUpdateOperationsInput | string | null
    read?: BoolFieldUpdateOperationsInput | boolean
    dismissible?: BoolFieldUpdateOperationsInput | boolean
    persistent?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutNotificationsNestedInput
  }

  export type NotificationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    route?: NullableStringFieldUpdateOperationsInput | string | null
    read?: BoolFieldUpdateOperationsInput | boolean
    dismissible?: BoolFieldUpdateOperationsInput | boolean
    persistent?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationCreateManyInput = {
    id?: string
    userId: string
    type: string
    title: string
    message: string
    route?: string | null
    read?: boolean
    dismissible?: boolean
    persistent?: boolean
    createdAt?: Date | string
  }

  export type NotificationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    route?: NullableStringFieldUpdateOperationsInput | string | null
    read?: BoolFieldUpdateOperationsInput | boolean
    dismissible?: BoolFieldUpdateOperationsInput | boolean
    persistent?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    route?: NullableStringFieldUpdateOperationsInput | string | null
    read?: BoolFieldUpdateOperationsInput | boolean
    dismissible?: BoolFieldUpdateOperationsInput | boolean
    persistent?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AlertCreateInput = {
    id?: string
    category: $Enums.AlertCategory
    severity: $Enums.AlertSeverity
    title: string
    message: string
    read?: boolean
    createdAt?: Date | string
    property: PropertyCreateNestedOneWithoutAlertsInput
  }

  export type AlertUncheckedCreateInput = {
    id?: string
    propertyId: string
    category: $Enums.AlertCategory
    severity: $Enums.AlertSeverity
    title: string
    message: string
    read?: boolean
    createdAt?: Date | string
  }

  export type AlertUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    category?: EnumAlertCategoryFieldUpdateOperationsInput | $Enums.AlertCategory
    severity?: EnumAlertSeverityFieldUpdateOperationsInput | $Enums.AlertSeverity
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    read?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    property?: PropertyUpdateOneRequiredWithoutAlertsNestedInput
  }

  export type AlertUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    category?: EnumAlertCategoryFieldUpdateOperationsInput | $Enums.AlertCategory
    severity?: EnumAlertSeverityFieldUpdateOperationsInput | $Enums.AlertSeverity
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    read?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AlertCreateManyInput = {
    id?: string
    propertyId: string
    category: $Enums.AlertCategory
    severity: $Enums.AlertSeverity
    title: string
    message: string
    read?: boolean
    createdAt?: Date | string
  }

  export type AlertUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    category?: EnumAlertCategoryFieldUpdateOperationsInput | $Enums.AlertCategory
    severity?: EnumAlertSeverityFieldUpdateOperationsInput | $Enums.AlertSeverity
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    read?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AlertUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    category?: EnumAlertCategoryFieldUpdateOperationsInput | $Enums.AlertCategory
    severity?: EnumAlertSeverityFieldUpdateOperationsInput | $Enums.AlertSeverity
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    read?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BillCreateInput = {
    id?: string
    month: string
    totalAmount: number
    subscriptionFee: number
    usageCharge: number
    taxes: number
    status?: $Enums.BillStatus
    dueDate: Date | string
    generatedAt?: Date | string
    paidDate?: Date | string | null
    pdfUrl?: string | null
    property: PropertyCreateNestedOneWithoutBillsInput
  }

  export type BillUncheckedCreateInput = {
    id?: string
    propertyId: string
    month: string
    totalAmount: number
    subscriptionFee: number
    usageCharge: number
    taxes: number
    status?: $Enums.BillStatus
    dueDate: Date | string
    generatedAt?: Date | string
    paidDate?: Date | string | null
    pdfUrl?: string | null
  }

  export type BillUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    month?: StringFieldUpdateOperationsInput | string
    totalAmount?: FloatFieldUpdateOperationsInput | number
    subscriptionFee?: FloatFieldUpdateOperationsInput | number
    usageCharge?: FloatFieldUpdateOperationsInput | number
    taxes?: FloatFieldUpdateOperationsInput | number
    status?: EnumBillStatusFieldUpdateOperationsInput | $Enums.BillStatus
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    generatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    paidDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pdfUrl?: NullableStringFieldUpdateOperationsInput | string | null
    property?: PropertyUpdateOneRequiredWithoutBillsNestedInput
  }

  export type BillUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    month?: StringFieldUpdateOperationsInput | string
    totalAmount?: FloatFieldUpdateOperationsInput | number
    subscriptionFee?: FloatFieldUpdateOperationsInput | number
    usageCharge?: FloatFieldUpdateOperationsInput | number
    taxes?: FloatFieldUpdateOperationsInput | number
    status?: EnumBillStatusFieldUpdateOperationsInput | $Enums.BillStatus
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    generatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    paidDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pdfUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type BillCreateManyInput = {
    id?: string
    propertyId: string
    month: string
    totalAmount: number
    subscriptionFee: number
    usageCharge: number
    taxes: number
    status?: $Enums.BillStatus
    dueDate: Date | string
    generatedAt?: Date | string
    paidDate?: Date | string | null
    pdfUrl?: string | null
  }

  export type BillUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    month?: StringFieldUpdateOperationsInput | string
    totalAmount?: FloatFieldUpdateOperationsInput | number
    subscriptionFee?: FloatFieldUpdateOperationsInput | number
    usageCharge?: FloatFieldUpdateOperationsInput | number
    taxes?: FloatFieldUpdateOperationsInput | number
    status?: EnumBillStatusFieldUpdateOperationsInput | $Enums.BillStatus
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    generatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    paidDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pdfUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type BillUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    month?: StringFieldUpdateOperationsInput | string
    totalAmount?: FloatFieldUpdateOperationsInput | number
    subscriptionFee?: FloatFieldUpdateOperationsInput | number
    usageCharge?: FloatFieldUpdateOperationsInput | number
    taxes?: FloatFieldUpdateOperationsInput | number
    status?: EnumBillStatusFieldUpdateOperationsInput | $Enums.BillStatus
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    generatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    paidDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pdfUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SupportTicketCreateInput = {
    id?: string
    category: $Enums.TicketCategory
    priority: $Enums.TicketPriority
    status?: $Enums.TicketStatus
    title: string
    description: string
    estimatedResponse?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutSupportTicketsInput
    property: PropertyCreateNestedOneWithoutSupportTicketsInput
  }

  export type SupportTicketUncheckedCreateInput = {
    id?: string
    userId: string
    propertyId: string
    category: $Enums.TicketCategory
    priority: $Enums.TicketPriority
    status?: $Enums.TicketStatus
    title: string
    description: string
    estimatedResponse?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SupportTicketUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    category?: EnumTicketCategoryFieldUpdateOperationsInput | $Enums.TicketCategory
    priority?: EnumTicketPriorityFieldUpdateOperationsInput | $Enums.TicketPriority
    status?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    estimatedResponse?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSupportTicketsNestedInput
    property?: PropertyUpdateOneRequiredWithoutSupportTicketsNestedInput
  }

  export type SupportTicketUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    category?: EnumTicketCategoryFieldUpdateOperationsInput | $Enums.TicketCategory
    priority?: EnumTicketPriorityFieldUpdateOperationsInput | $Enums.TicketPriority
    status?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    estimatedResponse?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SupportTicketCreateManyInput = {
    id?: string
    userId: string
    propertyId: string
    category: $Enums.TicketCategory
    priority: $Enums.TicketPriority
    status?: $Enums.TicketStatus
    title: string
    description: string
    estimatedResponse?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SupportTicketUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    category?: EnumTicketCategoryFieldUpdateOperationsInput | $Enums.TicketCategory
    priority?: EnumTicketPriorityFieldUpdateOperationsInput | $Enums.TicketPriority
    status?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    estimatedResponse?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SupportTicketUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    category?: EnumTicketCategoryFieldUpdateOperationsInput | $Enums.TicketCategory
    priority?: EnumTicketPriorityFieldUpdateOperationsInput | $Enums.TicketPriority
    status?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    estimatedResponse?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIMessageCreateInput = {
    id?: string
    role: $Enums.ChatRole
    content: string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutAiMessagesInput
    property: PropertyCreateNestedOneWithoutAiMessagesInput
  }

  export type AIMessageUncheckedCreateInput = {
    id?: string
    userId: string
    propertyId: string
    role: $Enums.ChatRole
    content: string
    createdAt?: Date | string
  }

  export type AIMessageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumChatRoleFieldUpdateOperationsInput | $Enums.ChatRole
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAiMessagesNestedInput
    property?: PropertyUpdateOneRequiredWithoutAiMessagesNestedInput
  }

  export type AIMessageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    role?: EnumChatRoleFieldUpdateOperationsInput | $Enums.ChatRole
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIMessageCreateManyInput = {
    id?: string
    userId: string
    propertyId: string
    role: $Enums.ChatRole
    content: string
    createdAt?: Date | string
  }

  export type AIMessageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumChatRoleFieldUpdateOperationsInput | $Enums.ChatRole
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIMessageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    role?: EnumChatRoleFieldUpdateOperationsInput | $Enums.ChatRole
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type RefreshTokenListRelationFilter = {
    every?: RefreshTokenWhereInput
    some?: RefreshTokenWhereInput
    none?: RefreshTokenWhereInput
  }

  export type PropertyListRelationFilter = {
    every?: PropertyWhereInput
    some?: PropertyWhereInput
    none?: PropertyWhereInput
  }

  export type NotificationListRelationFilter = {
    every?: NotificationWhereInput
    some?: NotificationWhereInput
    none?: NotificationWhereInput
  }

  export type SupportTicketListRelationFilter = {
    every?: SupportTicketWhereInput
    some?: SupportTicketWhereInput
    none?: SupportTicketWhereInput
  }

  export type AIMessageListRelationFilter = {
    every?: AIMessageWhereInput
    some?: AIMessageWhereInput
    none?: AIMessageWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type RefreshTokenOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PropertyOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type NotificationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SupportTicketOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AIMessageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    address?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    currentPropertyId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    address?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    currentPropertyId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    address?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    currentPropertyId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type RefreshTokenCountOrderByAggregateInput = {
    id?: SortOrder
    token?: SortOrder
    userId?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    isRevoked?: SortOrder
  }

  export type RefreshTokenMaxOrderByAggregateInput = {
    id?: SortOrder
    token?: SortOrder
    userId?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    isRevoked?: SortOrder
  }

  export type RefreshTokenMinOrderByAggregateInput = {
    id?: SortOrder
    token?: SortOrder
    userId?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    isRevoked?: SortOrder
  }

  export type EnumPropertyTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.PropertyType | EnumPropertyTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PropertyType[] | ListEnumPropertyTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PropertyType[] | ListEnumPropertyTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPropertyTypeFilter<$PrismaModel> | $Enums.PropertyType
  }

  export type EnumSubscriptionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.SubscriptionStatus | EnumSubscriptionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SubscriptionStatus[] | ListEnumSubscriptionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SubscriptionStatus[] | ListEnumSubscriptionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSubscriptionStatusFilter<$PrismaModel> | $Enums.SubscriptionStatus
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type SurveyListRelationFilter = {
    every?: SurveyWhereInput
    some?: SurveyWhereInput
    none?: SurveyWhereInput
  }

  export type ProposalListRelationFilter = {
    every?: ProposalWhereInput
    some?: ProposalWhereInput
    none?: ProposalWhereInput
  }

  export type PaymentListRelationFilter = {
    every?: PaymentWhereInput
    some?: PaymentWhereInput
    none?: PaymentWhereInput
  }

  export type InstallationProgressNullableRelationFilter = {
    is?: InstallationProgressWhereInput | null
    isNot?: InstallationProgressWhereInput | null
  }

  export type EnergyStatListRelationFilter = {
    every?: EnergyStatWhereInput
    some?: EnergyStatWhereInput
    none?: EnergyStatWhereInput
  }

  export type AlertListRelationFilter = {
    every?: AlertWhereInput
    some?: AlertWhereInput
    none?: AlertWhereInput
  }

  export type BillListRelationFilter = {
    every?: BillWhereInput
    some?: BillWhereInput
    none?: BillWhereInput
  }

  export type SurveyOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProposalOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PaymentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EnergyStatOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AlertOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BillOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PropertyCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    address?: SortOrder
    type?: SortOrder
    subscriptionStatus?: SortOrder
    planType?: SortOrder
    solarCapacity?: SortOrder
    batteryStorage?: SortOrder
    installationDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PropertyAvgOrderByAggregateInput = {
    solarCapacity?: SortOrder
    batteryStorage?: SortOrder
  }

  export type PropertyMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    address?: SortOrder
    type?: SortOrder
    subscriptionStatus?: SortOrder
    planType?: SortOrder
    solarCapacity?: SortOrder
    batteryStorage?: SortOrder
    installationDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PropertyMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    address?: SortOrder
    type?: SortOrder
    subscriptionStatus?: SortOrder
    planType?: SortOrder
    solarCapacity?: SortOrder
    batteryStorage?: SortOrder
    installationDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PropertySumOrderByAggregateInput = {
    solarCapacity?: SortOrder
    batteryStorage?: SortOrder
  }

  export type EnumPropertyTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PropertyType | EnumPropertyTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PropertyType[] | ListEnumPropertyTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PropertyType[] | ListEnumPropertyTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPropertyTypeWithAggregatesFilter<$PrismaModel> | $Enums.PropertyType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPropertyTypeFilter<$PrismaModel>
    _max?: NestedEnumPropertyTypeFilter<$PrismaModel>
  }

  export type EnumSubscriptionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SubscriptionStatus | EnumSubscriptionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SubscriptionStatus[] | ListEnumSubscriptionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SubscriptionStatus[] | ListEnumSubscriptionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSubscriptionStatusWithAggregatesFilter<$PrismaModel> | $Enums.SubscriptionStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSubscriptionStatusFilter<$PrismaModel>
    _max?: NestedEnumSubscriptionStatusFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type PropertyRelationFilter = {
    is?: PropertyWhereInput
    isNot?: PropertyWhereInput
  }

  export type SurveyCountOrderByAggregateInput = {
    id?: SortOrder
    propertyId?: SortOrder
    propertyType?: SortOrder
    roofArea?: SortOrder
    monthlyBill?: SortOrder
    monthlyConsumption?: SortOrder
    peakHours?: SortOrder
    occupants?: SortOrder
    appliances?: SortOrder
    status?: SortOrder
    submittedAt?: SortOrder
  }

  export type SurveyAvgOrderByAggregateInput = {
    roofArea?: SortOrder
    monthlyBill?: SortOrder
    monthlyConsumption?: SortOrder
    occupants?: SortOrder
  }

  export type SurveyMaxOrderByAggregateInput = {
    id?: SortOrder
    propertyId?: SortOrder
    propertyType?: SortOrder
    roofArea?: SortOrder
    monthlyBill?: SortOrder
    monthlyConsumption?: SortOrder
    peakHours?: SortOrder
    occupants?: SortOrder
    status?: SortOrder
    submittedAt?: SortOrder
  }

  export type SurveyMinOrderByAggregateInput = {
    id?: SortOrder
    propertyId?: SortOrder
    propertyType?: SortOrder
    roofArea?: SortOrder
    monthlyBill?: SortOrder
    monthlyConsumption?: SortOrder
    peakHours?: SortOrder
    occupants?: SortOrder
    status?: SortOrder
    submittedAt?: SortOrder
  }

  export type SurveySumOrderByAggregateInput = {
    roofArea?: SortOrder
    monthlyBill?: SortOrder
    monthlyConsumption?: SortOrder
    occupants?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type ProposalCountOrderByAggregateInput = {
    id?: SortOrder
    propertyId?: SortOrder
    surveyId?: SortOrder
    solarCapacity?: SortOrder
    batteryStorage?: SortOrder
    monthlyFee?: SortOrder
    estimatedSavings?: SortOrder
    estimatedProduction?: SortOrder
    contractDuration?: SortOrder
    installationFee?: SortOrder
    securityDeposit?: SortOrder
    whatsIncluded?: SortOrder
    generatedAt?: SortOrder
    expiresAt?: SortOrder
  }

  export type ProposalAvgOrderByAggregateInput = {
    solarCapacity?: SortOrder
    batteryStorage?: SortOrder
    monthlyFee?: SortOrder
    estimatedSavings?: SortOrder
    estimatedProduction?: SortOrder
    contractDuration?: SortOrder
    installationFee?: SortOrder
    securityDeposit?: SortOrder
  }

  export type ProposalMaxOrderByAggregateInput = {
    id?: SortOrder
    propertyId?: SortOrder
    surveyId?: SortOrder
    solarCapacity?: SortOrder
    batteryStorage?: SortOrder
    monthlyFee?: SortOrder
    estimatedSavings?: SortOrder
    estimatedProduction?: SortOrder
    contractDuration?: SortOrder
    installationFee?: SortOrder
    securityDeposit?: SortOrder
    generatedAt?: SortOrder
    expiresAt?: SortOrder
  }

  export type ProposalMinOrderByAggregateInput = {
    id?: SortOrder
    propertyId?: SortOrder
    surveyId?: SortOrder
    solarCapacity?: SortOrder
    batteryStorage?: SortOrder
    monthlyFee?: SortOrder
    estimatedSavings?: SortOrder
    estimatedProduction?: SortOrder
    contractDuration?: SortOrder
    installationFee?: SortOrder
    securityDeposit?: SortOrder
    generatedAt?: SortOrder
    expiresAt?: SortOrder
  }

  export type ProposalSumOrderByAggregateInput = {
    solarCapacity?: SortOrder
    batteryStorage?: SortOrder
    monthlyFee?: SortOrder
    estimatedSavings?: SortOrder
    estimatedProduction?: SortOrder
    contractDuration?: SortOrder
    installationFee?: SortOrder
    securityDeposit?: SortOrder
  }

  export type EnumPaymentMethodFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentMethod | EnumPaymentMethodFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentMethod[] | ListEnumPaymentMethodFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentMethod[] | ListEnumPaymentMethodFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentMethodFilter<$PrismaModel> | $Enums.PaymentMethod
  }

  export type EnumPaymentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusFilter<$PrismaModel> | $Enums.PaymentStatus
  }

  export type PaymentCountOrderByAggregateInput = {
    id?: SortOrder
    propertyId?: SortOrder
    proposalId?: SortOrder
    orderId?: SortOrder
    transactionId?: SortOrder
    paymentMethod?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    signature?: SortOrder
    description?: SortOrder
    paymentGatewayUrl?: SortOrder
    paidAt?: SortOrder
    createdAt?: SortOrder
  }

  export type PaymentAvgOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type PaymentMaxOrderByAggregateInput = {
    id?: SortOrder
    propertyId?: SortOrder
    proposalId?: SortOrder
    orderId?: SortOrder
    transactionId?: SortOrder
    paymentMethod?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    signature?: SortOrder
    description?: SortOrder
    paymentGatewayUrl?: SortOrder
    paidAt?: SortOrder
    createdAt?: SortOrder
  }

  export type PaymentMinOrderByAggregateInput = {
    id?: SortOrder
    propertyId?: SortOrder
    proposalId?: SortOrder
    orderId?: SortOrder
    transactionId?: SortOrder
    paymentMethod?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    signature?: SortOrder
    description?: SortOrder
    paymentGatewayUrl?: SortOrder
    paidAt?: SortOrder
    createdAt?: SortOrder
  }

  export type PaymentSumOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type EnumPaymentMethodWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentMethod | EnumPaymentMethodFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentMethod[] | ListEnumPaymentMethodFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentMethod[] | ListEnumPaymentMethodFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentMethodWithAggregatesFilter<$PrismaModel> | $Enums.PaymentMethod
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentMethodFilter<$PrismaModel>
    _max?: NestedEnumPaymentMethodFilter<$PrismaModel>
  }

  export type EnumPaymentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel> | $Enums.PaymentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentStatusFilter<$PrismaModel>
    _max?: NestedEnumPaymentStatusFilter<$PrismaModel>
  }

  export type InstallationProgressCountOrderByAggregateInput = {
    id?: SortOrder
    propertyId?: SortOrder
    paymentConfirmed?: SortOrder
    paymentConfirmedAt?: SortOrder
    engineerAssigned?: SortOrder
    engineerName?: SortOrder
    engineerPhone?: SortOrder
    engineerAssignedAt?: SortOrder
    siteSurveyScheduled?: SortOrder
    siteSurveyDate?: SortOrder
    installationStarted?: SortOrder
    installationDate?: SortOrder
    systemActivated?: SortOrder
    activationDate?: SortOrder
    estimatedCompletion?: SortOrder
    updatedAt?: SortOrder
  }

  export type InstallationProgressMaxOrderByAggregateInput = {
    id?: SortOrder
    propertyId?: SortOrder
    paymentConfirmed?: SortOrder
    paymentConfirmedAt?: SortOrder
    engineerAssigned?: SortOrder
    engineerName?: SortOrder
    engineerPhone?: SortOrder
    engineerAssignedAt?: SortOrder
    siteSurveyScheduled?: SortOrder
    siteSurveyDate?: SortOrder
    installationStarted?: SortOrder
    installationDate?: SortOrder
    systemActivated?: SortOrder
    activationDate?: SortOrder
    estimatedCompletion?: SortOrder
    updatedAt?: SortOrder
  }

  export type InstallationProgressMinOrderByAggregateInput = {
    id?: SortOrder
    propertyId?: SortOrder
    paymentConfirmed?: SortOrder
    paymentConfirmedAt?: SortOrder
    engineerAssigned?: SortOrder
    engineerName?: SortOrder
    engineerPhone?: SortOrder
    engineerAssignedAt?: SortOrder
    siteSurveyScheduled?: SortOrder
    siteSurveyDate?: SortOrder
    installationStarted?: SortOrder
    installationDate?: SortOrder
    systemActivated?: SortOrder
    activationDate?: SortOrder
    estimatedCompletion?: SortOrder
    updatedAt?: SortOrder
  }

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type EnergyStatCountOrderByAggregateInput = {
    id?: SortOrder
    propertyId?: SortOrder
    date?: SortOrder
    period?: SortOrder
    production?: SortOrder
    consumption?: SortOrder
    gridUsage?: SortOrder
    batteryPercent?: SortOrder
    solarKw?: SortOrder
    gridKw?: SortOrder
    exporting?: SortOrder
  }

  export type EnergyStatAvgOrderByAggregateInput = {
    production?: SortOrder
    consumption?: SortOrder
    gridUsage?: SortOrder
    batteryPercent?: SortOrder
    solarKw?: SortOrder
    gridKw?: SortOrder
  }

  export type EnergyStatMaxOrderByAggregateInput = {
    id?: SortOrder
    propertyId?: SortOrder
    date?: SortOrder
    period?: SortOrder
    production?: SortOrder
    consumption?: SortOrder
    gridUsage?: SortOrder
    batteryPercent?: SortOrder
    solarKw?: SortOrder
    gridKw?: SortOrder
    exporting?: SortOrder
  }

  export type EnergyStatMinOrderByAggregateInput = {
    id?: SortOrder
    propertyId?: SortOrder
    date?: SortOrder
    period?: SortOrder
    production?: SortOrder
    consumption?: SortOrder
    gridUsage?: SortOrder
    batteryPercent?: SortOrder
    solarKw?: SortOrder
    gridKw?: SortOrder
    exporting?: SortOrder
  }

  export type EnergyStatSumOrderByAggregateInput = {
    production?: SortOrder
    consumption?: SortOrder
    gridUsage?: SortOrder
    batteryPercent?: SortOrder
    solarKw?: SortOrder
    gridKw?: SortOrder
  }

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type NotificationCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    title?: SortOrder
    message?: SortOrder
    route?: SortOrder
    read?: SortOrder
    dismissible?: SortOrder
    persistent?: SortOrder
    createdAt?: SortOrder
  }

  export type NotificationMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    title?: SortOrder
    message?: SortOrder
    route?: SortOrder
    read?: SortOrder
    dismissible?: SortOrder
    persistent?: SortOrder
    createdAt?: SortOrder
  }

  export type NotificationMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    title?: SortOrder
    message?: SortOrder
    route?: SortOrder
    read?: SortOrder
    dismissible?: SortOrder
    persistent?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumAlertCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.AlertCategory | EnumAlertCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.AlertCategory[] | ListEnumAlertCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.AlertCategory[] | ListEnumAlertCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumAlertCategoryFilter<$PrismaModel> | $Enums.AlertCategory
  }

  export type EnumAlertSeverityFilter<$PrismaModel = never> = {
    equals?: $Enums.AlertSeverity | EnumAlertSeverityFieldRefInput<$PrismaModel>
    in?: $Enums.AlertSeverity[] | ListEnumAlertSeverityFieldRefInput<$PrismaModel>
    notIn?: $Enums.AlertSeverity[] | ListEnumAlertSeverityFieldRefInput<$PrismaModel>
    not?: NestedEnumAlertSeverityFilter<$PrismaModel> | $Enums.AlertSeverity
  }

  export type AlertCountOrderByAggregateInput = {
    id?: SortOrder
    propertyId?: SortOrder
    category?: SortOrder
    severity?: SortOrder
    title?: SortOrder
    message?: SortOrder
    read?: SortOrder
    createdAt?: SortOrder
  }

  export type AlertMaxOrderByAggregateInput = {
    id?: SortOrder
    propertyId?: SortOrder
    category?: SortOrder
    severity?: SortOrder
    title?: SortOrder
    message?: SortOrder
    read?: SortOrder
    createdAt?: SortOrder
  }

  export type AlertMinOrderByAggregateInput = {
    id?: SortOrder
    propertyId?: SortOrder
    category?: SortOrder
    severity?: SortOrder
    title?: SortOrder
    message?: SortOrder
    read?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumAlertCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AlertCategory | EnumAlertCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.AlertCategory[] | ListEnumAlertCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.AlertCategory[] | ListEnumAlertCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumAlertCategoryWithAggregatesFilter<$PrismaModel> | $Enums.AlertCategory
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAlertCategoryFilter<$PrismaModel>
    _max?: NestedEnumAlertCategoryFilter<$PrismaModel>
  }

  export type EnumAlertSeverityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AlertSeverity | EnumAlertSeverityFieldRefInput<$PrismaModel>
    in?: $Enums.AlertSeverity[] | ListEnumAlertSeverityFieldRefInput<$PrismaModel>
    notIn?: $Enums.AlertSeverity[] | ListEnumAlertSeverityFieldRefInput<$PrismaModel>
    not?: NestedEnumAlertSeverityWithAggregatesFilter<$PrismaModel> | $Enums.AlertSeverity
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAlertSeverityFilter<$PrismaModel>
    _max?: NestedEnumAlertSeverityFilter<$PrismaModel>
  }

  export type EnumBillStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.BillStatus | EnumBillStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BillStatus[] | ListEnumBillStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BillStatus[] | ListEnumBillStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBillStatusFilter<$PrismaModel> | $Enums.BillStatus
  }

  export type BillCountOrderByAggregateInput = {
    id?: SortOrder
    propertyId?: SortOrder
    month?: SortOrder
    totalAmount?: SortOrder
    subscriptionFee?: SortOrder
    usageCharge?: SortOrder
    taxes?: SortOrder
    status?: SortOrder
    dueDate?: SortOrder
    generatedAt?: SortOrder
    paidDate?: SortOrder
    pdfUrl?: SortOrder
  }

  export type BillAvgOrderByAggregateInput = {
    totalAmount?: SortOrder
    subscriptionFee?: SortOrder
    usageCharge?: SortOrder
    taxes?: SortOrder
  }

  export type BillMaxOrderByAggregateInput = {
    id?: SortOrder
    propertyId?: SortOrder
    month?: SortOrder
    totalAmount?: SortOrder
    subscriptionFee?: SortOrder
    usageCharge?: SortOrder
    taxes?: SortOrder
    status?: SortOrder
    dueDate?: SortOrder
    generatedAt?: SortOrder
    paidDate?: SortOrder
    pdfUrl?: SortOrder
  }

  export type BillMinOrderByAggregateInput = {
    id?: SortOrder
    propertyId?: SortOrder
    month?: SortOrder
    totalAmount?: SortOrder
    subscriptionFee?: SortOrder
    usageCharge?: SortOrder
    taxes?: SortOrder
    status?: SortOrder
    dueDate?: SortOrder
    generatedAt?: SortOrder
    paidDate?: SortOrder
    pdfUrl?: SortOrder
  }

  export type BillSumOrderByAggregateInput = {
    totalAmount?: SortOrder
    subscriptionFee?: SortOrder
    usageCharge?: SortOrder
    taxes?: SortOrder
  }

  export type EnumBillStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BillStatus | EnumBillStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BillStatus[] | ListEnumBillStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BillStatus[] | ListEnumBillStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBillStatusWithAggregatesFilter<$PrismaModel> | $Enums.BillStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBillStatusFilter<$PrismaModel>
    _max?: NestedEnumBillStatusFilter<$PrismaModel>
  }

  export type EnumTicketCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.TicketCategory | EnumTicketCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.TicketCategory[] | ListEnumTicketCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.TicketCategory[] | ListEnumTicketCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumTicketCategoryFilter<$PrismaModel> | $Enums.TicketCategory
  }

  export type EnumTicketPriorityFilter<$PrismaModel = never> = {
    equals?: $Enums.TicketPriority | EnumTicketPriorityFieldRefInput<$PrismaModel>
    in?: $Enums.TicketPriority[] | ListEnumTicketPriorityFieldRefInput<$PrismaModel>
    notIn?: $Enums.TicketPriority[] | ListEnumTicketPriorityFieldRefInput<$PrismaModel>
    not?: NestedEnumTicketPriorityFilter<$PrismaModel> | $Enums.TicketPriority
  }

  export type EnumTicketStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TicketStatus | EnumTicketStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TicketStatus[] | ListEnumTicketStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TicketStatus[] | ListEnumTicketStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTicketStatusFilter<$PrismaModel> | $Enums.TicketStatus
  }

  export type SupportTicketCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    propertyId?: SortOrder
    category?: SortOrder
    priority?: SortOrder
    status?: SortOrder
    title?: SortOrder
    description?: SortOrder
    estimatedResponse?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SupportTicketMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    propertyId?: SortOrder
    category?: SortOrder
    priority?: SortOrder
    status?: SortOrder
    title?: SortOrder
    description?: SortOrder
    estimatedResponse?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SupportTicketMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    propertyId?: SortOrder
    category?: SortOrder
    priority?: SortOrder
    status?: SortOrder
    title?: SortOrder
    description?: SortOrder
    estimatedResponse?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumTicketCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TicketCategory | EnumTicketCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.TicketCategory[] | ListEnumTicketCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.TicketCategory[] | ListEnumTicketCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumTicketCategoryWithAggregatesFilter<$PrismaModel> | $Enums.TicketCategory
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTicketCategoryFilter<$PrismaModel>
    _max?: NestedEnumTicketCategoryFilter<$PrismaModel>
  }

  export type EnumTicketPriorityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TicketPriority | EnumTicketPriorityFieldRefInput<$PrismaModel>
    in?: $Enums.TicketPriority[] | ListEnumTicketPriorityFieldRefInput<$PrismaModel>
    notIn?: $Enums.TicketPriority[] | ListEnumTicketPriorityFieldRefInput<$PrismaModel>
    not?: NestedEnumTicketPriorityWithAggregatesFilter<$PrismaModel> | $Enums.TicketPriority
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTicketPriorityFilter<$PrismaModel>
    _max?: NestedEnumTicketPriorityFilter<$PrismaModel>
  }

  export type EnumTicketStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TicketStatus | EnumTicketStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TicketStatus[] | ListEnumTicketStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TicketStatus[] | ListEnumTicketStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTicketStatusWithAggregatesFilter<$PrismaModel> | $Enums.TicketStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTicketStatusFilter<$PrismaModel>
    _max?: NestedEnumTicketStatusFilter<$PrismaModel>
  }

  export type EnumChatRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.ChatRole | EnumChatRoleFieldRefInput<$PrismaModel>
    in?: $Enums.ChatRole[] | ListEnumChatRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.ChatRole[] | ListEnumChatRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumChatRoleFilter<$PrismaModel> | $Enums.ChatRole
  }

  export type AIMessageCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    propertyId?: SortOrder
    role?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
  }

  export type AIMessageMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    propertyId?: SortOrder
    role?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
  }

  export type AIMessageMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    propertyId?: SortOrder
    role?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumChatRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ChatRole | EnumChatRoleFieldRefInput<$PrismaModel>
    in?: $Enums.ChatRole[] | ListEnumChatRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.ChatRole[] | ListEnumChatRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumChatRoleWithAggregatesFilter<$PrismaModel> | $Enums.ChatRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumChatRoleFilter<$PrismaModel>
    _max?: NestedEnumChatRoleFilter<$PrismaModel>
  }

  export type RefreshTokenCreateNestedManyWithoutUserInput = {
    create?: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput> | RefreshTokenCreateWithoutUserInput[] | RefreshTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RefreshTokenCreateOrConnectWithoutUserInput | RefreshTokenCreateOrConnectWithoutUserInput[]
    createMany?: RefreshTokenCreateManyUserInputEnvelope
    connect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
  }

  export type PropertyCreateNestedManyWithoutUserInput = {
    create?: XOR<PropertyCreateWithoutUserInput, PropertyUncheckedCreateWithoutUserInput> | PropertyCreateWithoutUserInput[] | PropertyUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PropertyCreateOrConnectWithoutUserInput | PropertyCreateOrConnectWithoutUserInput[]
    createMany?: PropertyCreateManyUserInputEnvelope
    connect?: PropertyWhereUniqueInput | PropertyWhereUniqueInput[]
  }

  export type NotificationCreateNestedManyWithoutUserInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
  }

  export type SupportTicketCreateNestedManyWithoutUserInput = {
    create?: XOR<SupportTicketCreateWithoutUserInput, SupportTicketUncheckedCreateWithoutUserInput> | SupportTicketCreateWithoutUserInput[] | SupportTicketUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SupportTicketCreateOrConnectWithoutUserInput | SupportTicketCreateOrConnectWithoutUserInput[]
    createMany?: SupportTicketCreateManyUserInputEnvelope
    connect?: SupportTicketWhereUniqueInput | SupportTicketWhereUniqueInput[]
  }

  export type AIMessageCreateNestedManyWithoutUserInput = {
    create?: XOR<AIMessageCreateWithoutUserInput, AIMessageUncheckedCreateWithoutUserInput> | AIMessageCreateWithoutUserInput[] | AIMessageUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AIMessageCreateOrConnectWithoutUserInput | AIMessageCreateOrConnectWithoutUserInput[]
    createMany?: AIMessageCreateManyUserInputEnvelope
    connect?: AIMessageWhereUniqueInput | AIMessageWhereUniqueInput[]
  }

  export type RefreshTokenUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput> | RefreshTokenCreateWithoutUserInput[] | RefreshTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RefreshTokenCreateOrConnectWithoutUserInput | RefreshTokenCreateOrConnectWithoutUserInput[]
    createMany?: RefreshTokenCreateManyUserInputEnvelope
    connect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
  }

  export type PropertyUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<PropertyCreateWithoutUserInput, PropertyUncheckedCreateWithoutUserInput> | PropertyCreateWithoutUserInput[] | PropertyUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PropertyCreateOrConnectWithoutUserInput | PropertyCreateOrConnectWithoutUserInput[]
    createMany?: PropertyCreateManyUserInputEnvelope
    connect?: PropertyWhereUniqueInput | PropertyWhereUniqueInput[]
  }

  export type NotificationUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
  }

  export type SupportTicketUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SupportTicketCreateWithoutUserInput, SupportTicketUncheckedCreateWithoutUserInput> | SupportTicketCreateWithoutUserInput[] | SupportTicketUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SupportTicketCreateOrConnectWithoutUserInput | SupportTicketCreateOrConnectWithoutUserInput[]
    createMany?: SupportTicketCreateManyUserInputEnvelope
    connect?: SupportTicketWhereUniqueInput | SupportTicketWhereUniqueInput[]
  }

  export type AIMessageUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AIMessageCreateWithoutUserInput, AIMessageUncheckedCreateWithoutUserInput> | AIMessageCreateWithoutUserInput[] | AIMessageUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AIMessageCreateOrConnectWithoutUserInput | AIMessageCreateOrConnectWithoutUserInput[]
    createMany?: AIMessageCreateManyUserInputEnvelope
    connect?: AIMessageWhereUniqueInput | AIMessageWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type RefreshTokenUpdateManyWithoutUserNestedInput = {
    create?: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput> | RefreshTokenCreateWithoutUserInput[] | RefreshTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RefreshTokenCreateOrConnectWithoutUserInput | RefreshTokenCreateOrConnectWithoutUserInput[]
    upsert?: RefreshTokenUpsertWithWhereUniqueWithoutUserInput | RefreshTokenUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: RefreshTokenCreateManyUserInputEnvelope
    set?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    disconnect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    delete?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    connect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    update?: RefreshTokenUpdateWithWhereUniqueWithoutUserInput | RefreshTokenUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: RefreshTokenUpdateManyWithWhereWithoutUserInput | RefreshTokenUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: RefreshTokenScalarWhereInput | RefreshTokenScalarWhereInput[]
  }

  export type PropertyUpdateManyWithoutUserNestedInput = {
    create?: XOR<PropertyCreateWithoutUserInput, PropertyUncheckedCreateWithoutUserInput> | PropertyCreateWithoutUserInput[] | PropertyUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PropertyCreateOrConnectWithoutUserInput | PropertyCreateOrConnectWithoutUserInput[]
    upsert?: PropertyUpsertWithWhereUniqueWithoutUserInput | PropertyUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PropertyCreateManyUserInputEnvelope
    set?: PropertyWhereUniqueInput | PropertyWhereUniqueInput[]
    disconnect?: PropertyWhereUniqueInput | PropertyWhereUniqueInput[]
    delete?: PropertyWhereUniqueInput | PropertyWhereUniqueInput[]
    connect?: PropertyWhereUniqueInput | PropertyWhereUniqueInput[]
    update?: PropertyUpdateWithWhereUniqueWithoutUserInput | PropertyUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PropertyUpdateManyWithWhereWithoutUserInput | PropertyUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PropertyScalarWhereInput | PropertyScalarWhereInput[]
  }

  export type NotificationUpdateManyWithoutUserNestedInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    upsert?: NotificationUpsertWithWhereUniqueWithoutUserInput | NotificationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    set?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    disconnect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    delete?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    update?: NotificationUpdateWithWhereUniqueWithoutUserInput | NotificationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: NotificationUpdateManyWithWhereWithoutUserInput | NotificationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
  }

  export type SupportTicketUpdateManyWithoutUserNestedInput = {
    create?: XOR<SupportTicketCreateWithoutUserInput, SupportTicketUncheckedCreateWithoutUserInput> | SupportTicketCreateWithoutUserInput[] | SupportTicketUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SupportTicketCreateOrConnectWithoutUserInput | SupportTicketCreateOrConnectWithoutUserInput[]
    upsert?: SupportTicketUpsertWithWhereUniqueWithoutUserInput | SupportTicketUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SupportTicketCreateManyUserInputEnvelope
    set?: SupportTicketWhereUniqueInput | SupportTicketWhereUniqueInput[]
    disconnect?: SupportTicketWhereUniqueInput | SupportTicketWhereUniqueInput[]
    delete?: SupportTicketWhereUniqueInput | SupportTicketWhereUniqueInput[]
    connect?: SupportTicketWhereUniqueInput | SupportTicketWhereUniqueInput[]
    update?: SupportTicketUpdateWithWhereUniqueWithoutUserInput | SupportTicketUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SupportTicketUpdateManyWithWhereWithoutUserInput | SupportTicketUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SupportTicketScalarWhereInput | SupportTicketScalarWhereInput[]
  }

  export type AIMessageUpdateManyWithoutUserNestedInput = {
    create?: XOR<AIMessageCreateWithoutUserInput, AIMessageUncheckedCreateWithoutUserInput> | AIMessageCreateWithoutUserInput[] | AIMessageUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AIMessageCreateOrConnectWithoutUserInput | AIMessageCreateOrConnectWithoutUserInput[]
    upsert?: AIMessageUpsertWithWhereUniqueWithoutUserInput | AIMessageUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AIMessageCreateManyUserInputEnvelope
    set?: AIMessageWhereUniqueInput | AIMessageWhereUniqueInput[]
    disconnect?: AIMessageWhereUniqueInput | AIMessageWhereUniqueInput[]
    delete?: AIMessageWhereUniqueInput | AIMessageWhereUniqueInput[]
    connect?: AIMessageWhereUniqueInput | AIMessageWhereUniqueInput[]
    update?: AIMessageUpdateWithWhereUniqueWithoutUserInput | AIMessageUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AIMessageUpdateManyWithWhereWithoutUserInput | AIMessageUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AIMessageScalarWhereInput | AIMessageScalarWhereInput[]
  }

  export type RefreshTokenUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput> | RefreshTokenCreateWithoutUserInput[] | RefreshTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RefreshTokenCreateOrConnectWithoutUserInput | RefreshTokenCreateOrConnectWithoutUserInput[]
    upsert?: RefreshTokenUpsertWithWhereUniqueWithoutUserInput | RefreshTokenUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: RefreshTokenCreateManyUserInputEnvelope
    set?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    disconnect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    delete?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    connect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    update?: RefreshTokenUpdateWithWhereUniqueWithoutUserInput | RefreshTokenUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: RefreshTokenUpdateManyWithWhereWithoutUserInput | RefreshTokenUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: RefreshTokenScalarWhereInput | RefreshTokenScalarWhereInput[]
  }

  export type PropertyUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<PropertyCreateWithoutUserInput, PropertyUncheckedCreateWithoutUserInput> | PropertyCreateWithoutUserInput[] | PropertyUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PropertyCreateOrConnectWithoutUserInput | PropertyCreateOrConnectWithoutUserInput[]
    upsert?: PropertyUpsertWithWhereUniqueWithoutUserInput | PropertyUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PropertyCreateManyUserInputEnvelope
    set?: PropertyWhereUniqueInput | PropertyWhereUniqueInput[]
    disconnect?: PropertyWhereUniqueInput | PropertyWhereUniqueInput[]
    delete?: PropertyWhereUniqueInput | PropertyWhereUniqueInput[]
    connect?: PropertyWhereUniqueInput | PropertyWhereUniqueInput[]
    update?: PropertyUpdateWithWhereUniqueWithoutUserInput | PropertyUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PropertyUpdateManyWithWhereWithoutUserInput | PropertyUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PropertyScalarWhereInput | PropertyScalarWhereInput[]
  }

  export type NotificationUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    upsert?: NotificationUpsertWithWhereUniqueWithoutUserInput | NotificationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    set?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    disconnect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    delete?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    update?: NotificationUpdateWithWhereUniqueWithoutUserInput | NotificationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: NotificationUpdateManyWithWhereWithoutUserInput | NotificationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
  }

  export type SupportTicketUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SupportTicketCreateWithoutUserInput, SupportTicketUncheckedCreateWithoutUserInput> | SupportTicketCreateWithoutUserInput[] | SupportTicketUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SupportTicketCreateOrConnectWithoutUserInput | SupportTicketCreateOrConnectWithoutUserInput[]
    upsert?: SupportTicketUpsertWithWhereUniqueWithoutUserInput | SupportTicketUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SupportTicketCreateManyUserInputEnvelope
    set?: SupportTicketWhereUniqueInput | SupportTicketWhereUniqueInput[]
    disconnect?: SupportTicketWhereUniqueInput | SupportTicketWhereUniqueInput[]
    delete?: SupportTicketWhereUniqueInput | SupportTicketWhereUniqueInput[]
    connect?: SupportTicketWhereUniqueInput | SupportTicketWhereUniqueInput[]
    update?: SupportTicketUpdateWithWhereUniqueWithoutUserInput | SupportTicketUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SupportTicketUpdateManyWithWhereWithoutUserInput | SupportTicketUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SupportTicketScalarWhereInput | SupportTicketScalarWhereInput[]
  }

  export type AIMessageUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AIMessageCreateWithoutUserInput, AIMessageUncheckedCreateWithoutUserInput> | AIMessageCreateWithoutUserInput[] | AIMessageUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AIMessageCreateOrConnectWithoutUserInput | AIMessageCreateOrConnectWithoutUserInput[]
    upsert?: AIMessageUpsertWithWhereUniqueWithoutUserInput | AIMessageUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AIMessageCreateManyUserInputEnvelope
    set?: AIMessageWhereUniqueInput | AIMessageWhereUniqueInput[]
    disconnect?: AIMessageWhereUniqueInput | AIMessageWhereUniqueInput[]
    delete?: AIMessageWhereUniqueInput | AIMessageWhereUniqueInput[]
    connect?: AIMessageWhereUniqueInput | AIMessageWhereUniqueInput[]
    update?: AIMessageUpdateWithWhereUniqueWithoutUserInput | AIMessageUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AIMessageUpdateManyWithWhereWithoutUserInput | AIMessageUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AIMessageScalarWhereInput | AIMessageScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutRefreshTokensInput = {
    create?: XOR<UserCreateWithoutRefreshTokensInput, UserUncheckedCreateWithoutRefreshTokensInput>
    connectOrCreate?: UserCreateOrConnectWithoutRefreshTokensInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutRefreshTokensNestedInput = {
    create?: XOR<UserCreateWithoutRefreshTokensInput, UserUncheckedCreateWithoutRefreshTokensInput>
    connectOrCreate?: UserCreateOrConnectWithoutRefreshTokensInput
    upsert?: UserUpsertWithoutRefreshTokensInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutRefreshTokensInput, UserUpdateWithoutRefreshTokensInput>, UserUncheckedUpdateWithoutRefreshTokensInput>
  }

  export type UserCreateNestedOneWithoutPropertiesInput = {
    create?: XOR<UserCreateWithoutPropertiesInput, UserUncheckedCreateWithoutPropertiesInput>
    connectOrCreate?: UserCreateOrConnectWithoutPropertiesInput
    connect?: UserWhereUniqueInput
  }

  export type SurveyCreateNestedManyWithoutPropertyInput = {
    create?: XOR<SurveyCreateWithoutPropertyInput, SurveyUncheckedCreateWithoutPropertyInput> | SurveyCreateWithoutPropertyInput[] | SurveyUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: SurveyCreateOrConnectWithoutPropertyInput | SurveyCreateOrConnectWithoutPropertyInput[]
    createMany?: SurveyCreateManyPropertyInputEnvelope
    connect?: SurveyWhereUniqueInput | SurveyWhereUniqueInput[]
  }

  export type ProposalCreateNestedManyWithoutPropertyInput = {
    create?: XOR<ProposalCreateWithoutPropertyInput, ProposalUncheckedCreateWithoutPropertyInput> | ProposalCreateWithoutPropertyInput[] | ProposalUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: ProposalCreateOrConnectWithoutPropertyInput | ProposalCreateOrConnectWithoutPropertyInput[]
    createMany?: ProposalCreateManyPropertyInputEnvelope
    connect?: ProposalWhereUniqueInput | ProposalWhereUniqueInput[]
  }

  export type PaymentCreateNestedManyWithoutPropertyInput = {
    create?: XOR<PaymentCreateWithoutPropertyInput, PaymentUncheckedCreateWithoutPropertyInput> | PaymentCreateWithoutPropertyInput[] | PaymentUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutPropertyInput | PaymentCreateOrConnectWithoutPropertyInput[]
    createMany?: PaymentCreateManyPropertyInputEnvelope
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
  }

  export type InstallationProgressCreateNestedOneWithoutPropertyInput = {
    create?: XOR<InstallationProgressCreateWithoutPropertyInput, InstallationProgressUncheckedCreateWithoutPropertyInput>
    connectOrCreate?: InstallationProgressCreateOrConnectWithoutPropertyInput
    connect?: InstallationProgressWhereUniqueInput
  }

  export type EnergyStatCreateNestedManyWithoutPropertyInput = {
    create?: XOR<EnergyStatCreateWithoutPropertyInput, EnergyStatUncheckedCreateWithoutPropertyInput> | EnergyStatCreateWithoutPropertyInput[] | EnergyStatUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: EnergyStatCreateOrConnectWithoutPropertyInput | EnergyStatCreateOrConnectWithoutPropertyInput[]
    createMany?: EnergyStatCreateManyPropertyInputEnvelope
    connect?: EnergyStatWhereUniqueInput | EnergyStatWhereUniqueInput[]
  }

  export type AlertCreateNestedManyWithoutPropertyInput = {
    create?: XOR<AlertCreateWithoutPropertyInput, AlertUncheckedCreateWithoutPropertyInput> | AlertCreateWithoutPropertyInput[] | AlertUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: AlertCreateOrConnectWithoutPropertyInput | AlertCreateOrConnectWithoutPropertyInput[]
    createMany?: AlertCreateManyPropertyInputEnvelope
    connect?: AlertWhereUniqueInput | AlertWhereUniqueInput[]
  }

  export type BillCreateNestedManyWithoutPropertyInput = {
    create?: XOR<BillCreateWithoutPropertyInput, BillUncheckedCreateWithoutPropertyInput> | BillCreateWithoutPropertyInput[] | BillUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: BillCreateOrConnectWithoutPropertyInput | BillCreateOrConnectWithoutPropertyInput[]
    createMany?: BillCreateManyPropertyInputEnvelope
    connect?: BillWhereUniqueInput | BillWhereUniqueInput[]
  }

  export type SupportTicketCreateNestedManyWithoutPropertyInput = {
    create?: XOR<SupportTicketCreateWithoutPropertyInput, SupportTicketUncheckedCreateWithoutPropertyInput> | SupportTicketCreateWithoutPropertyInput[] | SupportTicketUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: SupportTicketCreateOrConnectWithoutPropertyInput | SupportTicketCreateOrConnectWithoutPropertyInput[]
    createMany?: SupportTicketCreateManyPropertyInputEnvelope
    connect?: SupportTicketWhereUniqueInput | SupportTicketWhereUniqueInput[]
  }

  export type AIMessageCreateNestedManyWithoutPropertyInput = {
    create?: XOR<AIMessageCreateWithoutPropertyInput, AIMessageUncheckedCreateWithoutPropertyInput> | AIMessageCreateWithoutPropertyInput[] | AIMessageUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: AIMessageCreateOrConnectWithoutPropertyInput | AIMessageCreateOrConnectWithoutPropertyInput[]
    createMany?: AIMessageCreateManyPropertyInputEnvelope
    connect?: AIMessageWhereUniqueInput | AIMessageWhereUniqueInput[]
  }

  export type SurveyUncheckedCreateNestedManyWithoutPropertyInput = {
    create?: XOR<SurveyCreateWithoutPropertyInput, SurveyUncheckedCreateWithoutPropertyInput> | SurveyCreateWithoutPropertyInput[] | SurveyUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: SurveyCreateOrConnectWithoutPropertyInput | SurveyCreateOrConnectWithoutPropertyInput[]
    createMany?: SurveyCreateManyPropertyInputEnvelope
    connect?: SurveyWhereUniqueInput | SurveyWhereUniqueInput[]
  }

  export type ProposalUncheckedCreateNestedManyWithoutPropertyInput = {
    create?: XOR<ProposalCreateWithoutPropertyInput, ProposalUncheckedCreateWithoutPropertyInput> | ProposalCreateWithoutPropertyInput[] | ProposalUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: ProposalCreateOrConnectWithoutPropertyInput | ProposalCreateOrConnectWithoutPropertyInput[]
    createMany?: ProposalCreateManyPropertyInputEnvelope
    connect?: ProposalWhereUniqueInput | ProposalWhereUniqueInput[]
  }

  export type PaymentUncheckedCreateNestedManyWithoutPropertyInput = {
    create?: XOR<PaymentCreateWithoutPropertyInput, PaymentUncheckedCreateWithoutPropertyInput> | PaymentCreateWithoutPropertyInput[] | PaymentUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutPropertyInput | PaymentCreateOrConnectWithoutPropertyInput[]
    createMany?: PaymentCreateManyPropertyInputEnvelope
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
  }

  export type InstallationProgressUncheckedCreateNestedOneWithoutPropertyInput = {
    create?: XOR<InstallationProgressCreateWithoutPropertyInput, InstallationProgressUncheckedCreateWithoutPropertyInput>
    connectOrCreate?: InstallationProgressCreateOrConnectWithoutPropertyInput
    connect?: InstallationProgressWhereUniqueInput
  }

  export type EnergyStatUncheckedCreateNestedManyWithoutPropertyInput = {
    create?: XOR<EnergyStatCreateWithoutPropertyInput, EnergyStatUncheckedCreateWithoutPropertyInput> | EnergyStatCreateWithoutPropertyInput[] | EnergyStatUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: EnergyStatCreateOrConnectWithoutPropertyInput | EnergyStatCreateOrConnectWithoutPropertyInput[]
    createMany?: EnergyStatCreateManyPropertyInputEnvelope
    connect?: EnergyStatWhereUniqueInput | EnergyStatWhereUniqueInput[]
  }

  export type AlertUncheckedCreateNestedManyWithoutPropertyInput = {
    create?: XOR<AlertCreateWithoutPropertyInput, AlertUncheckedCreateWithoutPropertyInput> | AlertCreateWithoutPropertyInput[] | AlertUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: AlertCreateOrConnectWithoutPropertyInput | AlertCreateOrConnectWithoutPropertyInput[]
    createMany?: AlertCreateManyPropertyInputEnvelope
    connect?: AlertWhereUniqueInput | AlertWhereUniqueInput[]
  }

  export type BillUncheckedCreateNestedManyWithoutPropertyInput = {
    create?: XOR<BillCreateWithoutPropertyInput, BillUncheckedCreateWithoutPropertyInput> | BillCreateWithoutPropertyInput[] | BillUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: BillCreateOrConnectWithoutPropertyInput | BillCreateOrConnectWithoutPropertyInput[]
    createMany?: BillCreateManyPropertyInputEnvelope
    connect?: BillWhereUniqueInput | BillWhereUniqueInput[]
  }

  export type SupportTicketUncheckedCreateNestedManyWithoutPropertyInput = {
    create?: XOR<SupportTicketCreateWithoutPropertyInput, SupportTicketUncheckedCreateWithoutPropertyInput> | SupportTicketCreateWithoutPropertyInput[] | SupportTicketUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: SupportTicketCreateOrConnectWithoutPropertyInput | SupportTicketCreateOrConnectWithoutPropertyInput[]
    createMany?: SupportTicketCreateManyPropertyInputEnvelope
    connect?: SupportTicketWhereUniqueInput | SupportTicketWhereUniqueInput[]
  }

  export type AIMessageUncheckedCreateNestedManyWithoutPropertyInput = {
    create?: XOR<AIMessageCreateWithoutPropertyInput, AIMessageUncheckedCreateWithoutPropertyInput> | AIMessageCreateWithoutPropertyInput[] | AIMessageUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: AIMessageCreateOrConnectWithoutPropertyInput | AIMessageCreateOrConnectWithoutPropertyInput[]
    createMany?: AIMessageCreateManyPropertyInputEnvelope
    connect?: AIMessageWhereUniqueInput | AIMessageWhereUniqueInput[]
  }

  export type EnumPropertyTypeFieldUpdateOperationsInput = {
    set?: $Enums.PropertyType
  }

  export type EnumSubscriptionStatusFieldUpdateOperationsInput = {
    set?: $Enums.SubscriptionStatus
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UserUpdateOneRequiredWithoutPropertiesNestedInput = {
    create?: XOR<UserCreateWithoutPropertiesInput, UserUncheckedCreateWithoutPropertiesInput>
    connectOrCreate?: UserCreateOrConnectWithoutPropertiesInput
    upsert?: UserUpsertWithoutPropertiesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPropertiesInput, UserUpdateWithoutPropertiesInput>, UserUncheckedUpdateWithoutPropertiesInput>
  }

  export type SurveyUpdateManyWithoutPropertyNestedInput = {
    create?: XOR<SurveyCreateWithoutPropertyInput, SurveyUncheckedCreateWithoutPropertyInput> | SurveyCreateWithoutPropertyInput[] | SurveyUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: SurveyCreateOrConnectWithoutPropertyInput | SurveyCreateOrConnectWithoutPropertyInput[]
    upsert?: SurveyUpsertWithWhereUniqueWithoutPropertyInput | SurveyUpsertWithWhereUniqueWithoutPropertyInput[]
    createMany?: SurveyCreateManyPropertyInputEnvelope
    set?: SurveyWhereUniqueInput | SurveyWhereUniqueInput[]
    disconnect?: SurveyWhereUniqueInput | SurveyWhereUniqueInput[]
    delete?: SurveyWhereUniqueInput | SurveyWhereUniqueInput[]
    connect?: SurveyWhereUniqueInput | SurveyWhereUniqueInput[]
    update?: SurveyUpdateWithWhereUniqueWithoutPropertyInput | SurveyUpdateWithWhereUniqueWithoutPropertyInput[]
    updateMany?: SurveyUpdateManyWithWhereWithoutPropertyInput | SurveyUpdateManyWithWhereWithoutPropertyInput[]
    deleteMany?: SurveyScalarWhereInput | SurveyScalarWhereInput[]
  }

  export type ProposalUpdateManyWithoutPropertyNestedInput = {
    create?: XOR<ProposalCreateWithoutPropertyInput, ProposalUncheckedCreateWithoutPropertyInput> | ProposalCreateWithoutPropertyInput[] | ProposalUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: ProposalCreateOrConnectWithoutPropertyInput | ProposalCreateOrConnectWithoutPropertyInput[]
    upsert?: ProposalUpsertWithWhereUniqueWithoutPropertyInput | ProposalUpsertWithWhereUniqueWithoutPropertyInput[]
    createMany?: ProposalCreateManyPropertyInputEnvelope
    set?: ProposalWhereUniqueInput | ProposalWhereUniqueInput[]
    disconnect?: ProposalWhereUniqueInput | ProposalWhereUniqueInput[]
    delete?: ProposalWhereUniqueInput | ProposalWhereUniqueInput[]
    connect?: ProposalWhereUniqueInput | ProposalWhereUniqueInput[]
    update?: ProposalUpdateWithWhereUniqueWithoutPropertyInput | ProposalUpdateWithWhereUniqueWithoutPropertyInput[]
    updateMany?: ProposalUpdateManyWithWhereWithoutPropertyInput | ProposalUpdateManyWithWhereWithoutPropertyInput[]
    deleteMany?: ProposalScalarWhereInput | ProposalScalarWhereInput[]
  }

  export type PaymentUpdateManyWithoutPropertyNestedInput = {
    create?: XOR<PaymentCreateWithoutPropertyInput, PaymentUncheckedCreateWithoutPropertyInput> | PaymentCreateWithoutPropertyInput[] | PaymentUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutPropertyInput | PaymentCreateOrConnectWithoutPropertyInput[]
    upsert?: PaymentUpsertWithWhereUniqueWithoutPropertyInput | PaymentUpsertWithWhereUniqueWithoutPropertyInput[]
    createMany?: PaymentCreateManyPropertyInputEnvelope
    set?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    disconnect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    delete?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    update?: PaymentUpdateWithWhereUniqueWithoutPropertyInput | PaymentUpdateWithWhereUniqueWithoutPropertyInput[]
    updateMany?: PaymentUpdateManyWithWhereWithoutPropertyInput | PaymentUpdateManyWithWhereWithoutPropertyInput[]
    deleteMany?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
  }

  export type InstallationProgressUpdateOneWithoutPropertyNestedInput = {
    create?: XOR<InstallationProgressCreateWithoutPropertyInput, InstallationProgressUncheckedCreateWithoutPropertyInput>
    connectOrCreate?: InstallationProgressCreateOrConnectWithoutPropertyInput
    upsert?: InstallationProgressUpsertWithoutPropertyInput
    disconnect?: InstallationProgressWhereInput | boolean
    delete?: InstallationProgressWhereInput | boolean
    connect?: InstallationProgressWhereUniqueInput
    update?: XOR<XOR<InstallationProgressUpdateToOneWithWhereWithoutPropertyInput, InstallationProgressUpdateWithoutPropertyInput>, InstallationProgressUncheckedUpdateWithoutPropertyInput>
  }

  export type EnergyStatUpdateManyWithoutPropertyNestedInput = {
    create?: XOR<EnergyStatCreateWithoutPropertyInput, EnergyStatUncheckedCreateWithoutPropertyInput> | EnergyStatCreateWithoutPropertyInput[] | EnergyStatUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: EnergyStatCreateOrConnectWithoutPropertyInput | EnergyStatCreateOrConnectWithoutPropertyInput[]
    upsert?: EnergyStatUpsertWithWhereUniqueWithoutPropertyInput | EnergyStatUpsertWithWhereUniqueWithoutPropertyInput[]
    createMany?: EnergyStatCreateManyPropertyInputEnvelope
    set?: EnergyStatWhereUniqueInput | EnergyStatWhereUniqueInput[]
    disconnect?: EnergyStatWhereUniqueInput | EnergyStatWhereUniqueInput[]
    delete?: EnergyStatWhereUniqueInput | EnergyStatWhereUniqueInput[]
    connect?: EnergyStatWhereUniqueInput | EnergyStatWhereUniqueInput[]
    update?: EnergyStatUpdateWithWhereUniqueWithoutPropertyInput | EnergyStatUpdateWithWhereUniqueWithoutPropertyInput[]
    updateMany?: EnergyStatUpdateManyWithWhereWithoutPropertyInput | EnergyStatUpdateManyWithWhereWithoutPropertyInput[]
    deleteMany?: EnergyStatScalarWhereInput | EnergyStatScalarWhereInput[]
  }

  export type AlertUpdateManyWithoutPropertyNestedInput = {
    create?: XOR<AlertCreateWithoutPropertyInput, AlertUncheckedCreateWithoutPropertyInput> | AlertCreateWithoutPropertyInput[] | AlertUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: AlertCreateOrConnectWithoutPropertyInput | AlertCreateOrConnectWithoutPropertyInput[]
    upsert?: AlertUpsertWithWhereUniqueWithoutPropertyInput | AlertUpsertWithWhereUniqueWithoutPropertyInput[]
    createMany?: AlertCreateManyPropertyInputEnvelope
    set?: AlertWhereUniqueInput | AlertWhereUniqueInput[]
    disconnect?: AlertWhereUniqueInput | AlertWhereUniqueInput[]
    delete?: AlertWhereUniqueInput | AlertWhereUniqueInput[]
    connect?: AlertWhereUniqueInput | AlertWhereUniqueInput[]
    update?: AlertUpdateWithWhereUniqueWithoutPropertyInput | AlertUpdateWithWhereUniqueWithoutPropertyInput[]
    updateMany?: AlertUpdateManyWithWhereWithoutPropertyInput | AlertUpdateManyWithWhereWithoutPropertyInput[]
    deleteMany?: AlertScalarWhereInput | AlertScalarWhereInput[]
  }

  export type BillUpdateManyWithoutPropertyNestedInput = {
    create?: XOR<BillCreateWithoutPropertyInput, BillUncheckedCreateWithoutPropertyInput> | BillCreateWithoutPropertyInput[] | BillUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: BillCreateOrConnectWithoutPropertyInput | BillCreateOrConnectWithoutPropertyInput[]
    upsert?: BillUpsertWithWhereUniqueWithoutPropertyInput | BillUpsertWithWhereUniqueWithoutPropertyInput[]
    createMany?: BillCreateManyPropertyInputEnvelope
    set?: BillWhereUniqueInput | BillWhereUniqueInput[]
    disconnect?: BillWhereUniqueInput | BillWhereUniqueInput[]
    delete?: BillWhereUniqueInput | BillWhereUniqueInput[]
    connect?: BillWhereUniqueInput | BillWhereUniqueInput[]
    update?: BillUpdateWithWhereUniqueWithoutPropertyInput | BillUpdateWithWhereUniqueWithoutPropertyInput[]
    updateMany?: BillUpdateManyWithWhereWithoutPropertyInput | BillUpdateManyWithWhereWithoutPropertyInput[]
    deleteMany?: BillScalarWhereInput | BillScalarWhereInput[]
  }

  export type SupportTicketUpdateManyWithoutPropertyNestedInput = {
    create?: XOR<SupportTicketCreateWithoutPropertyInput, SupportTicketUncheckedCreateWithoutPropertyInput> | SupportTicketCreateWithoutPropertyInput[] | SupportTicketUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: SupportTicketCreateOrConnectWithoutPropertyInput | SupportTicketCreateOrConnectWithoutPropertyInput[]
    upsert?: SupportTicketUpsertWithWhereUniqueWithoutPropertyInput | SupportTicketUpsertWithWhereUniqueWithoutPropertyInput[]
    createMany?: SupportTicketCreateManyPropertyInputEnvelope
    set?: SupportTicketWhereUniqueInput | SupportTicketWhereUniqueInput[]
    disconnect?: SupportTicketWhereUniqueInput | SupportTicketWhereUniqueInput[]
    delete?: SupportTicketWhereUniqueInput | SupportTicketWhereUniqueInput[]
    connect?: SupportTicketWhereUniqueInput | SupportTicketWhereUniqueInput[]
    update?: SupportTicketUpdateWithWhereUniqueWithoutPropertyInput | SupportTicketUpdateWithWhereUniqueWithoutPropertyInput[]
    updateMany?: SupportTicketUpdateManyWithWhereWithoutPropertyInput | SupportTicketUpdateManyWithWhereWithoutPropertyInput[]
    deleteMany?: SupportTicketScalarWhereInput | SupportTicketScalarWhereInput[]
  }

  export type AIMessageUpdateManyWithoutPropertyNestedInput = {
    create?: XOR<AIMessageCreateWithoutPropertyInput, AIMessageUncheckedCreateWithoutPropertyInput> | AIMessageCreateWithoutPropertyInput[] | AIMessageUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: AIMessageCreateOrConnectWithoutPropertyInput | AIMessageCreateOrConnectWithoutPropertyInput[]
    upsert?: AIMessageUpsertWithWhereUniqueWithoutPropertyInput | AIMessageUpsertWithWhereUniqueWithoutPropertyInput[]
    createMany?: AIMessageCreateManyPropertyInputEnvelope
    set?: AIMessageWhereUniqueInput | AIMessageWhereUniqueInput[]
    disconnect?: AIMessageWhereUniqueInput | AIMessageWhereUniqueInput[]
    delete?: AIMessageWhereUniqueInput | AIMessageWhereUniqueInput[]
    connect?: AIMessageWhereUniqueInput | AIMessageWhereUniqueInput[]
    update?: AIMessageUpdateWithWhereUniqueWithoutPropertyInput | AIMessageUpdateWithWhereUniqueWithoutPropertyInput[]
    updateMany?: AIMessageUpdateManyWithWhereWithoutPropertyInput | AIMessageUpdateManyWithWhereWithoutPropertyInput[]
    deleteMany?: AIMessageScalarWhereInput | AIMessageScalarWhereInput[]
  }

  export type SurveyUncheckedUpdateManyWithoutPropertyNestedInput = {
    create?: XOR<SurveyCreateWithoutPropertyInput, SurveyUncheckedCreateWithoutPropertyInput> | SurveyCreateWithoutPropertyInput[] | SurveyUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: SurveyCreateOrConnectWithoutPropertyInput | SurveyCreateOrConnectWithoutPropertyInput[]
    upsert?: SurveyUpsertWithWhereUniqueWithoutPropertyInput | SurveyUpsertWithWhereUniqueWithoutPropertyInput[]
    createMany?: SurveyCreateManyPropertyInputEnvelope
    set?: SurveyWhereUniqueInput | SurveyWhereUniqueInput[]
    disconnect?: SurveyWhereUniqueInput | SurveyWhereUniqueInput[]
    delete?: SurveyWhereUniqueInput | SurveyWhereUniqueInput[]
    connect?: SurveyWhereUniqueInput | SurveyWhereUniqueInput[]
    update?: SurveyUpdateWithWhereUniqueWithoutPropertyInput | SurveyUpdateWithWhereUniqueWithoutPropertyInput[]
    updateMany?: SurveyUpdateManyWithWhereWithoutPropertyInput | SurveyUpdateManyWithWhereWithoutPropertyInput[]
    deleteMany?: SurveyScalarWhereInput | SurveyScalarWhereInput[]
  }

  export type ProposalUncheckedUpdateManyWithoutPropertyNestedInput = {
    create?: XOR<ProposalCreateWithoutPropertyInput, ProposalUncheckedCreateWithoutPropertyInput> | ProposalCreateWithoutPropertyInput[] | ProposalUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: ProposalCreateOrConnectWithoutPropertyInput | ProposalCreateOrConnectWithoutPropertyInput[]
    upsert?: ProposalUpsertWithWhereUniqueWithoutPropertyInput | ProposalUpsertWithWhereUniqueWithoutPropertyInput[]
    createMany?: ProposalCreateManyPropertyInputEnvelope
    set?: ProposalWhereUniqueInput | ProposalWhereUniqueInput[]
    disconnect?: ProposalWhereUniqueInput | ProposalWhereUniqueInput[]
    delete?: ProposalWhereUniqueInput | ProposalWhereUniqueInput[]
    connect?: ProposalWhereUniqueInput | ProposalWhereUniqueInput[]
    update?: ProposalUpdateWithWhereUniqueWithoutPropertyInput | ProposalUpdateWithWhereUniqueWithoutPropertyInput[]
    updateMany?: ProposalUpdateManyWithWhereWithoutPropertyInput | ProposalUpdateManyWithWhereWithoutPropertyInput[]
    deleteMany?: ProposalScalarWhereInput | ProposalScalarWhereInput[]
  }

  export type PaymentUncheckedUpdateManyWithoutPropertyNestedInput = {
    create?: XOR<PaymentCreateWithoutPropertyInput, PaymentUncheckedCreateWithoutPropertyInput> | PaymentCreateWithoutPropertyInput[] | PaymentUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutPropertyInput | PaymentCreateOrConnectWithoutPropertyInput[]
    upsert?: PaymentUpsertWithWhereUniqueWithoutPropertyInput | PaymentUpsertWithWhereUniqueWithoutPropertyInput[]
    createMany?: PaymentCreateManyPropertyInputEnvelope
    set?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    disconnect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    delete?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    update?: PaymentUpdateWithWhereUniqueWithoutPropertyInput | PaymentUpdateWithWhereUniqueWithoutPropertyInput[]
    updateMany?: PaymentUpdateManyWithWhereWithoutPropertyInput | PaymentUpdateManyWithWhereWithoutPropertyInput[]
    deleteMany?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
  }

  export type InstallationProgressUncheckedUpdateOneWithoutPropertyNestedInput = {
    create?: XOR<InstallationProgressCreateWithoutPropertyInput, InstallationProgressUncheckedCreateWithoutPropertyInput>
    connectOrCreate?: InstallationProgressCreateOrConnectWithoutPropertyInput
    upsert?: InstallationProgressUpsertWithoutPropertyInput
    disconnect?: InstallationProgressWhereInput | boolean
    delete?: InstallationProgressWhereInput | boolean
    connect?: InstallationProgressWhereUniqueInput
    update?: XOR<XOR<InstallationProgressUpdateToOneWithWhereWithoutPropertyInput, InstallationProgressUpdateWithoutPropertyInput>, InstallationProgressUncheckedUpdateWithoutPropertyInput>
  }

  export type EnergyStatUncheckedUpdateManyWithoutPropertyNestedInput = {
    create?: XOR<EnergyStatCreateWithoutPropertyInput, EnergyStatUncheckedCreateWithoutPropertyInput> | EnergyStatCreateWithoutPropertyInput[] | EnergyStatUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: EnergyStatCreateOrConnectWithoutPropertyInput | EnergyStatCreateOrConnectWithoutPropertyInput[]
    upsert?: EnergyStatUpsertWithWhereUniqueWithoutPropertyInput | EnergyStatUpsertWithWhereUniqueWithoutPropertyInput[]
    createMany?: EnergyStatCreateManyPropertyInputEnvelope
    set?: EnergyStatWhereUniqueInput | EnergyStatWhereUniqueInput[]
    disconnect?: EnergyStatWhereUniqueInput | EnergyStatWhereUniqueInput[]
    delete?: EnergyStatWhereUniqueInput | EnergyStatWhereUniqueInput[]
    connect?: EnergyStatWhereUniqueInput | EnergyStatWhereUniqueInput[]
    update?: EnergyStatUpdateWithWhereUniqueWithoutPropertyInput | EnergyStatUpdateWithWhereUniqueWithoutPropertyInput[]
    updateMany?: EnergyStatUpdateManyWithWhereWithoutPropertyInput | EnergyStatUpdateManyWithWhereWithoutPropertyInput[]
    deleteMany?: EnergyStatScalarWhereInput | EnergyStatScalarWhereInput[]
  }

  export type AlertUncheckedUpdateManyWithoutPropertyNestedInput = {
    create?: XOR<AlertCreateWithoutPropertyInput, AlertUncheckedCreateWithoutPropertyInput> | AlertCreateWithoutPropertyInput[] | AlertUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: AlertCreateOrConnectWithoutPropertyInput | AlertCreateOrConnectWithoutPropertyInput[]
    upsert?: AlertUpsertWithWhereUniqueWithoutPropertyInput | AlertUpsertWithWhereUniqueWithoutPropertyInput[]
    createMany?: AlertCreateManyPropertyInputEnvelope
    set?: AlertWhereUniqueInput | AlertWhereUniqueInput[]
    disconnect?: AlertWhereUniqueInput | AlertWhereUniqueInput[]
    delete?: AlertWhereUniqueInput | AlertWhereUniqueInput[]
    connect?: AlertWhereUniqueInput | AlertWhereUniqueInput[]
    update?: AlertUpdateWithWhereUniqueWithoutPropertyInput | AlertUpdateWithWhereUniqueWithoutPropertyInput[]
    updateMany?: AlertUpdateManyWithWhereWithoutPropertyInput | AlertUpdateManyWithWhereWithoutPropertyInput[]
    deleteMany?: AlertScalarWhereInput | AlertScalarWhereInput[]
  }

  export type BillUncheckedUpdateManyWithoutPropertyNestedInput = {
    create?: XOR<BillCreateWithoutPropertyInput, BillUncheckedCreateWithoutPropertyInput> | BillCreateWithoutPropertyInput[] | BillUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: BillCreateOrConnectWithoutPropertyInput | BillCreateOrConnectWithoutPropertyInput[]
    upsert?: BillUpsertWithWhereUniqueWithoutPropertyInput | BillUpsertWithWhereUniqueWithoutPropertyInput[]
    createMany?: BillCreateManyPropertyInputEnvelope
    set?: BillWhereUniqueInput | BillWhereUniqueInput[]
    disconnect?: BillWhereUniqueInput | BillWhereUniqueInput[]
    delete?: BillWhereUniqueInput | BillWhereUniqueInput[]
    connect?: BillWhereUniqueInput | BillWhereUniqueInput[]
    update?: BillUpdateWithWhereUniqueWithoutPropertyInput | BillUpdateWithWhereUniqueWithoutPropertyInput[]
    updateMany?: BillUpdateManyWithWhereWithoutPropertyInput | BillUpdateManyWithWhereWithoutPropertyInput[]
    deleteMany?: BillScalarWhereInput | BillScalarWhereInput[]
  }

  export type SupportTicketUncheckedUpdateManyWithoutPropertyNestedInput = {
    create?: XOR<SupportTicketCreateWithoutPropertyInput, SupportTicketUncheckedCreateWithoutPropertyInput> | SupportTicketCreateWithoutPropertyInput[] | SupportTicketUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: SupportTicketCreateOrConnectWithoutPropertyInput | SupportTicketCreateOrConnectWithoutPropertyInput[]
    upsert?: SupportTicketUpsertWithWhereUniqueWithoutPropertyInput | SupportTicketUpsertWithWhereUniqueWithoutPropertyInput[]
    createMany?: SupportTicketCreateManyPropertyInputEnvelope
    set?: SupportTicketWhereUniqueInput | SupportTicketWhereUniqueInput[]
    disconnect?: SupportTicketWhereUniqueInput | SupportTicketWhereUniqueInput[]
    delete?: SupportTicketWhereUniqueInput | SupportTicketWhereUniqueInput[]
    connect?: SupportTicketWhereUniqueInput | SupportTicketWhereUniqueInput[]
    update?: SupportTicketUpdateWithWhereUniqueWithoutPropertyInput | SupportTicketUpdateWithWhereUniqueWithoutPropertyInput[]
    updateMany?: SupportTicketUpdateManyWithWhereWithoutPropertyInput | SupportTicketUpdateManyWithWhereWithoutPropertyInput[]
    deleteMany?: SupportTicketScalarWhereInput | SupportTicketScalarWhereInput[]
  }

  export type AIMessageUncheckedUpdateManyWithoutPropertyNestedInput = {
    create?: XOR<AIMessageCreateWithoutPropertyInput, AIMessageUncheckedCreateWithoutPropertyInput> | AIMessageCreateWithoutPropertyInput[] | AIMessageUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: AIMessageCreateOrConnectWithoutPropertyInput | AIMessageCreateOrConnectWithoutPropertyInput[]
    upsert?: AIMessageUpsertWithWhereUniqueWithoutPropertyInput | AIMessageUpsertWithWhereUniqueWithoutPropertyInput[]
    createMany?: AIMessageCreateManyPropertyInputEnvelope
    set?: AIMessageWhereUniqueInput | AIMessageWhereUniqueInput[]
    disconnect?: AIMessageWhereUniqueInput | AIMessageWhereUniqueInput[]
    delete?: AIMessageWhereUniqueInput | AIMessageWhereUniqueInput[]
    connect?: AIMessageWhereUniqueInput | AIMessageWhereUniqueInput[]
    update?: AIMessageUpdateWithWhereUniqueWithoutPropertyInput | AIMessageUpdateWithWhereUniqueWithoutPropertyInput[]
    updateMany?: AIMessageUpdateManyWithWhereWithoutPropertyInput | AIMessageUpdateManyWithWhereWithoutPropertyInput[]
    deleteMany?: AIMessageScalarWhereInput | AIMessageScalarWhereInput[]
  }

  export type SurveyCreateappliancesInput = {
    set: string[]
  }

  export type PropertyCreateNestedOneWithoutSurveysInput = {
    create?: XOR<PropertyCreateWithoutSurveysInput, PropertyUncheckedCreateWithoutSurveysInput>
    connectOrCreate?: PropertyCreateOrConnectWithoutSurveysInput
    connect?: PropertyWhereUniqueInput
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type SurveyUpdateappliancesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type PropertyUpdateOneRequiredWithoutSurveysNestedInput = {
    create?: XOR<PropertyCreateWithoutSurveysInput, PropertyUncheckedCreateWithoutSurveysInput>
    connectOrCreate?: PropertyCreateOrConnectWithoutSurveysInput
    upsert?: PropertyUpsertWithoutSurveysInput
    connect?: PropertyWhereUniqueInput
    update?: XOR<XOR<PropertyUpdateToOneWithWhereWithoutSurveysInput, PropertyUpdateWithoutSurveysInput>, PropertyUncheckedUpdateWithoutSurveysInput>
  }

  export type ProposalCreatewhatsIncludedInput = {
    set: string[]
  }

  export type PropertyCreateNestedOneWithoutProposalsInput = {
    create?: XOR<PropertyCreateWithoutProposalsInput, PropertyUncheckedCreateWithoutProposalsInput>
    connectOrCreate?: PropertyCreateOrConnectWithoutProposalsInput
    connect?: PropertyWhereUniqueInput
  }

  export type ProposalUpdatewhatsIncludedInput = {
    set?: string[]
    push?: string | string[]
  }

  export type PropertyUpdateOneRequiredWithoutProposalsNestedInput = {
    create?: XOR<PropertyCreateWithoutProposalsInput, PropertyUncheckedCreateWithoutProposalsInput>
    connectOrCreate?: PropertyCreateOrConnectWithoutProposalsInput
    upsert?: PropertyUpsertWithoutProposalsInput
    connect?: PropertyWhereUniqueInput
    update?: XOR<XOR<PropertyUpdateToOneWithWhereWithoutProposalsInput, PropertyUpdateWithoutProposalsInput>, PropertyUncheckedUpdateWithoutProposalsInput>
  }

  export type PropertyCreateNestedOneWithoutPaymentsInput = {
    create?: XOR<PropertyCreateWithoutPaymentsInput, PropertyUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: PropertyCreateOrConnectWithoutPaymentsInput
    connect?: PropertyWhereUniqueInput
  }

  export type EnumPaymentMethodFieldUpdateOperationsInput = {
    set?: $Enums.PaymentMethod
  }

  export type EnumPaymentStatusFieldUpdateOperationsInput = {
    set?: $Enums.PaymentStatus
  }

  export type PropertyUpdateOneRequiredWithoutPaymentsNestedInput = {
    create?: XOR<PropertyCreateWithoutPaymentsInput, PropertyUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: PropertyCreateOrConnectWithoutPaymentsInput
    upsert?: PropertyUpsertWithoutPaymentsInput
    connect?: PropertyWhereUniqueInput
    update?: XOR<XOR<PropertyUpdateToOneWithWhereWithoutPaymentsInput, PropertyUpdateWithoutPaymentsInput>, PropertyUncheckedUpdateWithoutPaymentsInput>
  }

  export type PropertyCreateNestedOneWithoutInstallationInput = {
    create?: XOR<PropertyCreateWithoutInstallationInput, PropertyUncheckedCreateWithoutInstallationInput>
    connectOrCreate?: PropertyCreateOrConnectWithoutInstallationInput
    connect?: PropertyWhereUniqueInput
  }

  export type PropertyUpdateOneRequiredWithoutInstallationNestedInput = {
    create?: XOR<PropertyCreateWithoutInstallationInput, PropertyUncheckedCreateWithoutInstallationInput>
    connectOrCreate?: PropertyCreateOrConnectWithoutInstallationInput
    upsert?: PropertyUpsertWithoutInstallationInput
    connect?: PropertyWhereUniqueInput
    update?: XOR<XOR<PropertyUpdateToOneWithWhereWithoutInstallationInput, PropertyUpdateWithoutInstallationInput>, PropertyUncheckedUpdateWithoutInstallationInput>
  }

  export type PropertyCreateNestedOneWithoutEnergyStatsInput = {
    create?: XOR<PropertyCreateWithoutEnergyStatsInput, PropertyUncheckedCreateWithoutEnergyStatsInput>
    connectOrCreate?: PropertyCreateOrConnectWithoutEnergyStatsInput
    connect?: PropertyWhereUniqueInput
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type PropertyUpdateOneRequiredWithoutEnergyStatsNestedInput = {
    create?: XOR<PropertyCreateWithoutEnergyStatsInput, PropertyUncheckedCreateWithoutEnergyStatsInput>
    connectOrCreate?: PropertyCreateOrConnectWithoutEnergyStatsInput
    upsert?: PropertyUpsertWithoutEnergyStatsInput
    connect?: PropertyWhereUniqueInput
    update?: XOR<XOR<PropertyUpdateToOneWithWhereWithoutEnergyStatsInput, PropertyUpdateWithoutEnergyStatsInput>, PropertyUncheckedUpdateWithoutEnergyStatsInput>
  }

  export type UserCreateNestedOneWithoutNotificationsInput = {
    create?: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutNotificationsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutNotificationsNestedInput = {
    create?: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutNotificationsInput
    upsert?: UserUpsertWithoutNotificationsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutNotificationsInput, UserUpdateWithoutNotificationsInput>, UserUncheckedUpdateWithoutNotificationsInput>
  }

  export type PropertyCreateNestedOneWithoutAlertsInput = {
    create?: XOR<PropertyCreateWithoutAlertsInput, PropertyUncheckedCreateWithoutAlertsInput>
    connectOrCreate?: PropertyCreateOrConnectWithoutAlertsInput
    connect?: PropertyWhereUniqueInput
  }

  export type EnumAlertCategoryFieldUpdateOperationsInput = {
    set?: $Enums.AlertCategory
  }

  export type EnumAlertSeverityFieldUpdateOperationsInput = {
    set?: $Enums.AlertSeverity
  }

  export type PropertyUpdateOneRequiredWithoutAlertsNestedInput = {
    create?: XOR<PropertyCreateWithoutAlertsInput, PropertyUncheckedCreateWithoutAlertsInput>
    connectOrCreate?: PropertyCreateOrConnectWithoutAlertsInput
    upsert?: PropertyUpsertWithoutAlertsInput
    connect?: PropertyWhereUniqueInput
    update?: XOR<XOR<PropertyUpdateToOneWithWhereWithoutAlertsInput, PropertyUpdateWithoutAlertsInput>, PropertyUncheckedUpdateWithoutAlertsInput>
  }

  export type PropertyCreateNestedOneWithoutBillsInput = {
    create?: XOR<PropertyCreateWithoutBillsInput, PropertyUncheckedCreateWithoutBillsInput>
    connectOrCreate?: PropertyCreateOrConnectWithoutBillsInput
    connect?: PropertyWhereUniqueInput
  }

  export type EnumBillStatusFieldUpdateOperationsInput = {
    set?: $Enums.BillStatus
  }

  export type PropertyUpdateOneRequiredWithoutBillsNestedInput = {
    create?: XOR<PropertyCreateWithoutBillsInput, PropertyUncheckedCreateWithoutBillsInput>
    connectOrCreate?: PropertyCreateOrConnectWithoutBillsInput
    upsert?: PropertyUpsertWithoutBillsInput
    connect?: PropertyWhereUniqueInput
    update?: XOR<XOR<PropertyUpdateToOneWithWhereWithoutBillsInput, PropertyUpdateWithoutBillsInput>, PropertyUncheckedUpdateWithoutBillsInput>
  }

  export type UserCreateNestedOneWithoutSupportTicketsInput = {
    create?: XOR<UserCreateWithoutSupportTicketsInput, UserUncheckedCreateWithoutSupportTicketsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSupportTicketsInput
    connect?: UserWhereUniqueInput
  }

  export type PropertyCreateNestedOneWithoutSupportTicketsInput = {
    create?: XOR<PropertyCreateWithoutSupportTicketsInput, PropertyUncheckedCreateWithoutSupportTicketsInput>
    connectOrCreate?: PropertyCreateOrConnectWithoutSupportTicketsInput
    connect?: PropertyWhereUniqueInput
  }

  export type EnumTicketCategoryFieldUpdateOperationsInput = {
    set?: $Enums.TicketCategory
  }

  export type EnumTicketPriorityFieldUpdateOperationsInput = {
    set?: $Enums.TicketPriority
  }

  export type EnumTicketStatusFieldUpdateOperationsInput = {
    set?: $Enums.TicketStatus
  }

  export type UserUpdateOneRequiredWithoutSupportTicketsNestedInput = {
    create?: XOR<UserCreateWithoutSupportTicketsInput, UserUncheckedCreateWithoutSupportTicketsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSupportTicketsInput
    upsert?: UserUpsertWithoutSupportTicketsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSupportTicketsInput, UserUpdateWithoutSupportTicketsInput>, UserUncheckedUpdateWithoutSupportTicketsInput>
  }

  export type PropertyUpdateOneRequiredWithoutSupportTicketsNestedInput = {
    create?: XOR<PropertyCreateWithoutSupportTicketsInput, PropertyUncheckedCreateWithoutSupportTicketsInput>
    connectOrCreate?: PropertyCreateOrConnectWithoutSupportTicketsInput
    upsert?: PropertyUpsertWithoutSupportTicketsInput
    connect?: PropertyWhereUniqueInput
    update?: XOR<XOR<PropertyUpdateToOneWithWhereWithoutSupportTicketsInput, PropertyUpdateWithoutSupportTicketsInput>, PropertyUncheckedUpdateWithoutSupportTicketsInput>
  }

  export type UserCreateNestedOneWithoutAiMessagesInput = {
    create?: XOR<UserCreateWithoutAiMessagesInput, UserUncheckedCreateWithoutAiMessagesInput>
    connectOrCreate?: UserCreateOrConnectWithoutAiMessagesInput
    connect?: UserWhereUniqueInput
  }

  export type PropertyCreateNestedOneWithoutAiMessagesInput = {
    create?: XOR<PropertyCreateWithoutAiMessagesInput, PropertyUncheckedCreateWithoutAiMessagesInput>
    connectOrCreate?: PropertyCreateOrConnectWithoutAiMessagesInput
    connect?: PropertyWhereUniqueInput
  }

  export type EnumChatRoleFieldUpdateOperationsInput = {
    set?: $Enums.ChatRole
  }

  export type UserUpdateOneRequiredWithoutAiMessagesNestedInput = {
    create?: XOR<UserCreateWithoutAiMessagesInput, UserUncheckedCreateWithoutAiMessagesInput>
    connectOrCreate?: UserCreateOrConnectWithoutAiMessagesInput
    upsert?: UserUpsertWithoutAiMessagesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAiMessagesInput, UserUpdateWithoutAiMessagesInput>, UserUncheckedUpdateWithoutAiMessagesInput>
  }

  export type PropertyUpdateOneRequiredWithoutAiMessagesNestedInput = {
    create?: XOR<PropertyCreateWithoutAiMessagesInput, PropertyUncheckedCreateWithoutAiMessagesInput>
    connectOrCreate?: PropertyCreateOrConnectWithoutAiMessagesInput
    upsert?: PropertyUpsertWithoutAiMessagesInput
    connect?: PropertyWhereUniqueInput
    update?: XOR<XOR<PropertyUpdateToOneWithWhereWithoutAiMessagesInput, PropertyUpdateWithoutAiMessagesInput>, PropertyUncheckedUpdateWithoutAiMessagesInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumPropertyTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.PropertyType | EnumPropertyTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PropertyType[] | ListEnumPropertyTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PropertyType[] | ListEnumPropertyTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPropertyTypeFilter<$PrismaModel> | $Enums.PropertyType
  }

  export type NestedEnumSubscriptionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.SubscriptionStatus | EnumSubscriptionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SubscriptionStatus[] | ListEnumSubscriptionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SubscriptionStatus[] | ListEnumSubscriptionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSubscriptionStatusFilter<$PrismaModel> | $Enums.SubscriptionStatus
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumPropertyTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PropertyType | EnumPropertyTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PropertyType[] | ListEnumPropertyTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PropertyType[] | ListEnumPropertyTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPropertyTypeWithAggregatesFilter<$PrismaModel> | $Enums.PropertyType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPropertyTypeFilter<$PrismaModel>
    _max?: NestedEnumPropertyTypeFilter<$PrismaModel>
  }

  export type NestedEnumSubscriptionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SubscriptionStatus | EnumSubscriptionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SubscriptionStatus[] | ListEnumSubscriptionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SubscriptionStatus[] | ListEnumSubscriptionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSubscriptionStatusWithAggregatesFilter<$PrismaModel> | $Enums.SubscriptionStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSubscriptionStatusFilter<$PrismaModel>
    _max?: NestedEnumSubscriptionStatusFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedEnumPaymentMethodFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentMethod | EnumPaymentMethodFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentMethod[] | ListEnumPaymentMethodFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentMethod[] | ListEnumPaymentMethodFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentMethodFilter<$PrismaModel> | $Enums.PaymentMethod
  }

  export type NestedEnumPaymentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusFilter<$PrismaModel> | $Enums.PaymentStatus
  }

  export type NestedEnumPaymentMethodWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentMethod | EnumPaymentMethodFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentMethod[] | ListEnumPaymentMethodFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentMethod[] | ListEnumPaymentMethodFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentMethodWithAggregatesFilter<$PrismaModel> | $Enums.PaymentMethod
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentMethodFilter<$PrismaModel>
    _max?: NestedEnumPaymentMethodFilter<$PrismaModel>
  }

  export type NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel> | $Enums.PaymentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentStatusFilter<$PrismaModel>
    _max?: NestedEnumPaymentStatusFilter<$PrismaModel>
  }

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type NestedEnumAlertCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.AlertCategory | EnumAlertCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.AlertCategory[] | ListEnumAlertCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.AlertCategory[] | ListEnumAlertCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumAlertCategoryFilter<$PrismaModel> | $Enums.AlertCategory
  }

  export type NestedEnumAlertSeverityFilter<$PrismaModel = never> = {
    equals?: $Enums.AlertSeverity | EnumAlertSeverityFieldRefInput<$PrismaModel>
    in?: $Enums.AlertSeverity[] | ListEnumAlertSeverityFieldRefInput<$PrismaModel>
    notIn?: $Enums.AlertSeverity[] | ListEnumAlertSeverityFieldRefInput<$PrismaModel>
    not?: NestedEnumAlertSeverityFilter<$PrismaModel> | $Enums.AlertSeverity
  }

  export type NestedEnumAlertCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AlertCategory | EnumAlertCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.AlertCategory[] | ListEnumAlertCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.AlertCategory[] | ListEnumAlertCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumAlertCategoryWithAggregatesFilter<$PrismaModel> | $Enums.AlertCategory
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAlertCategoryFilter<$PrismaModel>
    _max?: NestedEnumAlertCategoryFilter<$PrismaModel>
  }

  export type NestedEnumAlertSeverityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AlertSeverity | EnumAlertSeverityFieldRefInput<$PrismaModel>
    in?: $Enums.AlertSeverity[] | ListEnumAlertSeverityFieldRefInput<$PrismaModel>
    notIn?: $Enums.AlertSeverity[] | ListEnumAlertSeverityFieldRefInput<$PrismaModel>
    not?: NestedEnumAlertSeverityWithAggregatesFilter<$PrismaModel> | $Enums.AlertSeverity
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAlertSeverityFilter<$PrismaModel>
    _max?: NestedEnumAlertSeverityFilter<$PrismaModel>
  }

  export type NestedEnumBillStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.BillStatus | EnumBillStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BillStatus[] | ListEnumBillStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BillStatus[] | ListEnumBillStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBillStatusFilter<$PrismaModel> | $Enums.BillStatus
  }

  export type NestedEnumBillStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BillStatus | EnumBillStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BillStatus[] | ListEnumBillStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BillStatus[] | ListEnumBillStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBillStatusWithAggregatesFilter<$PrismaModel> | $Enums.BillStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBillStatusFilter<$PrismaModel>
    _max?: NestedEnumBillStatusFilter<$PrismaModel>
  }

  export type NestedEnumTicketCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.TicketCategory | EnumTicketCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.TicketCategory[] | ListEnumTicketCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.TicketCategory[] | ListEnumTicketCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumTicketCategoryFilter<$PrismaModel> | $Enums.TicketCategory
  }

  export type NestedEnumTicketPriorityFilter<$PrismaModel = never> = {
    equals?: $Enums.TicketPriority | EnumTicketPriorityFieldRefInput<$PrismaModel>
    in?: $Enums.TicketPriority[] | ListEnumTicketPriorityFieldRefInput<$PrismaModel>
    notIn?: $Enums.TicketPriority[] | ListEnumTicketPriorityFieldRefInput<$PrismaModel>
    not?: NestedEnumTicketPriorityFilter<$PrismaModel> | $Enums.TicketPriority
  }

  export type NestedEnumTicketStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TicketStatus | EnumTicketStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TicketStatus[] | ListEnumTicketStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TicketStatus[] | ListEnumTicketStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTicketStatusFilter<$PrismaModel> | $Enums.TicketStatus
  }

  export type NestedEnumTicketCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TicketCategory | EnumTicketCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.TicketCategory[] | ListEnumTicketCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.TicketCategory[] | ListEnumTicketCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumTicketCategoryWithAggregatesFilter<$PrismaModel> | $Enums.TicketCategory
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTicketCategoryFilter<$PrismaModel>
    _max?: NestedEnumTicketCategoryFilter<$PrismaModel>
  }

  export type NestedEnumTicketPriorityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TicketPriority | EnumTicketPriorityFieldRefInput<$PrismaModel>
    in?: $Enums.TicketPriority[] | ListEnumTicketPriorityFieldRefInput<$PrismaModel>
    notIn?: $Enums.TicketPriority[] | ListEnumTicketPriorityFieldRefInput<$PrismaModel>
    not?: NestedEnumTicketPriorityWithAggregatesFilter<$PrismaModel> | $Enums.TicketPriority
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTicketPriorityFilter<$PrismaModel>
    _max?: NestedEnumTicketPriorityFilter<$PrismaModel>
  }

  export type NestedEnumTicketStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TicketStatus | EnumTicketStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TicketStatus[] | ListEnumTicketStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TicketStatus[] | ListEnumTicketStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTicketStatusWithAggregatesFilter<$PrismaModel> | $Enums.TicketStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTicketStatusFilter<$PrismaModel>
    _max?: NestedEnumTicketStatusFilter<$PrismaModel>
  }

  export type NestedEnumChatRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.ChatRole | EnumChatRoleFieldRefInput<$PrismaModel>
    in?: $Enums.ChatRole[] | ListEnumChatRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.ChatRole[] | ListEnumChatRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumChatRoleFilter<$PrismaModel> | $Enums.ChatRole
  }

  export type NestedEnumChatRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ChatRole | EnumChatRoleFieldRefInput<$PrismaModel>
    in?: $Enums.ChatRole[] | ListEnumChatRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.ChatRole[] | ListEnumChatRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumChatRoleWithAggregatesFilter<$PrismaModel> | $Enums.ChatRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumChatRoleFilter<$PrismaModel>
    _max?: NestedEnumChatRoleFilter<$PrismaModel>
  }

  export type RefreshTokenCreateWithoutUserInput = {
    id?: string
    token: string
    expiresAt: Date | string
    createdAt?: Date | string
    isRevoked?: boolean
  }

  export type RefreshTokenUncheckedCreateWithoutUserInput = {
    id?: string
    token: string
    expiresAt: Date | string
    createdAt?: Date | string
    isRevoked?: boolean
  }

  export type RefreshTokenCreateOrConnectWithoutUserInput = {
    where: RefreshTokenWhereUniqueInput
    create: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput>
  }

  export type RefreshTokenCreateManyUserInputEnvelope = {
    data: RefreshTokenCreateManyUserInput | RefreshTokenCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type PropertyCreateWithoutUserInput = {
    id?: string
    name: string
    address: string
    type: $Enums.PropertyType
    subscriptionStatus?: $Enums.SubscriptionStatus
    planType?: string | null
    solarCapacity?: number | null
    batteryStorage?: number | null
    installationDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    surveys?: SurveyCreateNestedManyWithoutPropertyInput
    proposals?: ProposalCreateNestedManyWithoutPropertyInput
    payments?: PaymentCreateNestedManyWithoutPropertyInput
    installation?: InstallationProgressCreateNestedOneWithoutPropertyInput
    energyStats?: EnergyStatCreateNestedManyWithoutPropertyInput
    alerts?: AlertCreateNestedManyWithoutPropertyInput
    bills?: BillCreateNestedManyWithoutPropertyInput
    supportTickets?: SupportTicketCreateNestedManyWithoutPropertyInput
    aiMessages?: AIMessageCreateNestedManyWithoutPropertyInput
  }

  export type PropertyUncheckedCreateWithoutUserInput = {
    id?: string
    name: string
    address: string
    type: $Enums.PropertyType
    subscriptionStatus?: $Enums.SubscriptionStatus
    planType?: string | null
    solarCapacity?: number | null
    batteryStorage?: number | null
    installationDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    surveys?: SurveyUncheckedCreateNestedManyWithoutPropertyInput
    proposals?: ProposalUncheckedCreateNestedManyWithoutPropertyInput
    payments?: PaymentUncheckedCreateNestedManyWithoutPropertyInput
    installation?: InstallationProgressUncheckedCreateNestedOneWithoutPropertyInput
    energyStats?: EnergyStatUncheckedCreateNestedManyWithoutPropertyInput
    alerts?: AlertUncheckedCreateNestedManyWithoutPropertyInput
    bills?: BillUncheckedCreateNestedManyWithoutPropertyInput
    supportTickets?: SupportTicketUncheckedCreateNestedManyWithoutPropertyInput
    aiMessages?: AIMessageUncheckedCreateNestedManyWithoutPropertyInput
  }

  export type PropertyCreateOrConnectWithoutUserInput = {
    where: PropertyWhereUniqueInput
    create: XOR<PropertyCreateWithoutUserInput, PropertyUncheckedCreateWithoutUserInput>
  }

  export type PropertyCreateManyUserInputEnvelope = {
    data: PropertyCreateManyUserInput | PropertyCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type NotificationCreateWithoutUserInput = {
    id?: string
    type: string
    title: string
    message: string
    route?: string | null
    read?: boolean
    dismissible?: boolean
    persistent?: boolean
    createdAt?: Date | string
  }

  export type NotificationUncheckedCreateWithoutUserInput = {
    id?: string
    type: string
    title: string
    message: string
    route?: string | null
    read?: boolean
    dismissible?: boolean
    persistent?: boolean
    createdAt?: Date | string
  }

  export type NotificationCreateOrConnectWithoutUserInput = {
    where: NotificationWhereUniqueInput
    create: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput>
  }

  export type NotificationCreateManyUserInputEnvelope = {
    data: NotificationCreateManyUserInput | NotificationCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type SupportTicketCreateWithoutUserInput = {
    id?: string
    category: $Enums.TicketCategory
    priority: $Enums.TicketPriority
    status?: $Enums.TicketStatus
    title: string
    description: string
    estimatedResponse?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    property: PropertyCreateNestedOneWithoutSupportTicketsInput
  }

  export type SupportTicketUncheckedCreateWithoutUserInput = {
    id?: string
    propertyId: string
    category: $Enums.TicketCategory
    priority: $Enums.TicketPriority
    status?: $Enums.TicketStatus
    title: string
    description: string
    estimatedResponse?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SupportTicketCreateOrConnectWithoutUserInput = {
    where: SupportTicketWhereUniqueInput
    create: XOR<SupportTicketCreateWithoutUserInput, SupportTicketUncheckedCreateWithoutUserInput>
  }

  export type SupportTicketCreateManyUserInputEnvelope = {
    data: SupportTicketCreateManyUserInput | SupportTicketCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type AIMessageCreateWithoutUserInput = {
    id?: string
    role: $Enums.ChatRole
    content: string
    createdAt?: Date | string
    property: PropertyCreateNestedOneWithoutAiMessagesInput
  }

  export type AIMessageUncheckedCreateWithoutUserInput = {
    id?: string
    propertyId: string
    role: $Enums.ChatRole
    content: string
    createdAt?: Date | string
  }

  export type AIMessageCreateOrConnectWithoutUserInput = {
    where: AIMessageWhereUniqueInput
    create: XOR<AIMessageCreateWithoutUserInput, AIMessageUncheckedCreateWithoutUserInput>
  }

  export type AIMessageCreateManyUserInputEnvelope = {
    data: AIMessageCreateManyUserInput | AIMessageCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type RefreshTokenUpsertWithWhereUniqueWithoutUserInput = {
    where: RefreshTokenWhereUniqueInput
    update: XOR<RefreshTokenUpdateWithoutUserInput, RefreshTokenUncheckedUpdateWithoutUserInput>
    create: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput>
  }

  export type RefreshTokenUpdateWithWhereUniqueWithoutUserInput = {
    where: RefreshTokenWhereUniqueInput
    data: XOR<RefreshTokenUpdateWithoutUserInput, RefreshTokenUncheckedUpdateWithoutUserInput>
  }

  export type RefreshTokenUpdateManyWithWhereWithoutUserInput = {
    where: RefreshTokenScalarWhereInput
    data: XOR<RefreshTokenUpdateManyMutationInput, RefreshTokenUncheckedUpdateManyWithoutUserInput>
  }

  export type RefreshTokenScalarWhereInput = {
    AND?: RefreshTokenScalarWhereInput | RefreshTokenScalarWhereInput[]
    OR?: RefreshTokenScalarWhereInput[]
    NOT?: RefreshTokenScalarWhereInput | RefreshTokenScalarWhereInput[]
    id?: StringFilter<"RefreshToken"> | string
    token?: StringFilter<"RefreshToken"> | string
    userId?: StringFilter<"RefreshToken"> | string
    expiresAt?: DateTimeFilter<"RefreshToken"> | Date | string
    createdAt?: DateTimeFilter<"RefreshToken"> | Date | string
    isRevoked?: BoolFilter<"RefreshToken"> | boolean
  }

  export type PropertyUpsertWithWhereUniqueWithoutUserInput = {
    where: PropertyWhereUniqueInput
    update: XOR<PropertyUpdateWithoutUserInput, PropertyUncheckedUpdateWithoutUserInput>
    create: XOR<PropertyCreateWithoutUserInput, PropertyUncheckedCreateWithoutUserInput>
  }

  export type PropertyUpdateWithWhereUniqueWithoutUserInput = {
    where: PropertyWhereUniqueInput
    data: XOR<PropertyUpdateWithoutUserInput, PropertyUncheckedUpdateWithoutUserInput>
  }

  export type PropertyUpdateManyWithWhereWithoutUserInput = {
    where: PropertyScalarWhereInput
    data: XOR<PropertyUpdateManyMutationInput, PropertyUncheckedUpdateManyWithoutUserInput>
  }

  export type PropertyScalarWhereInput = {
    AND?: PropertyScalarWhereInput | PropertyScalarWhereInput[]
    OR?: PropertyScalarWhereInput[]
    NOT?: PropertyScalarWhereInput | PropertyScalarWhereInput[]
    id?: StringFilter<"Property"> | string
    userId?: StringFilter<"Property"> | string
    name?: StringFilter<"Property"> | string
    address?: StringFilter<"Property"> | string
    type?: EnumPropertyTypeFilter<"Property"> | $Enums.PropertyType
    subscriptionStatus?: EnumSubscriptionStatusFilter<"Property"> | $Enums.SubscriptionStatus
    planType?: StringNullableFilter<"Property"> | string | null
    solarCapacity?: FloatNullableFilter<"Property"> | number | null
    batteryStorage?: FloatNullableFilter<"Property"> | number | null
    installationDate?: DateTimeNullableFilter<"Property"> | Date | string | null
    createdAt?: DateTimeFilter<"Property"> | Date | string
    updatedAt?: DateTimeFilter<"Property"> | Date | string
  }

  export type NotificationUpsertWithWhereUniqueWithoutUserInput = {
    where: NotificationWhereUniqueInput
    update: XOR<NotificationUpdateWithoutUserInput, NotificationUncheckedUpdateWithoutUserInput>
    create: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput>
  }

  export type NotificationUpdateWithWhereUniqueWithoutUserInput = {
    where: NotificationWhereUniqueInput
    data: XOR<NotificationUpdateWithoutUserInput, NotificationUncheckedUpdateWithoutUserInput>
  }

  export type NotificationUpdateManyWithWhereWithoutUserInput = {
    where: NotificationScalarWhereInput
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyWithoutUserInput>
  }

  export type NotificationScalarWhereInput = {
    AND?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
    OR?: NotificationScalarWhereInput[]
    NOT?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
    id?: StringFilter<"Notification"> | string
    userId?: StringFilter<"Notification"> | string
    type?: StringFilter<"Notification"> | string
    title?: StringFilter<"Notification"> | string
    message?: StringFilter<"Notification"> | string
    route?: StringNullableFilter<"Notification"> | string | null
    read?: BoolFilter<"Notification"> | boolean
    dismissible?: BoolFilter<"Notification"> | boolean
    persistent?: BoolFilter<"Notification"> | boolean
    createdAt?: DateTimeFilter<"Notification"> | Date | string
  }

  export type SupportTicketUpsertWithWhereUniqueWithoutUserInput = {
    where: SupportTicketWhereUniqueInput
    update: XOR<SupportTicketUpdateWithoutUserInput, SupportTicketUncheckedUpdateWithoutUserInput>
    create: XOR<SupportTicketCreateWithoutUserInput, SupportTicketUncheckedCreateWithoutUserInput>
  }

  export type SupportTicketUpdateWithWhereUniqueWithoutUserInput = {
    where: SupportTicketWhereUniqueInput
    data: XOR<SupportTicketUpdateWithoutUserInput, SupportTicketUncheckedUpdateWithoutUserInput>
  }

  export type SupportTicketUpdateManyWithWhereWithoutUserInput = {
    where: SupportTicketScalarWhereInput
    data: XOR<SupportTicketUpdateManyMutationInput, SupportTicketUncheckedUpdateManyWithoutUserInput>
  }

  export type SupportTicketScalarWhereInput = {
    AND?: SupportTicketScalarWhereInput | SupportTicketScalarWhereInput[]
    OR?: SupportTicketScalarWhereInput[]
    NOT?: SupportTicketScalarWhereInput | SupportTicketScalarWhereInput[]
    id?: StringFilter<"SupportTicket"> | string
    userId?: StringFilter<"SupportTicket"> | string
    propertyId?: StringFilter<"SupportTicket"> | string
    category?: EnumTicketCategoryFilter<"SupportTicket"> | $Enums.TicketCategory
    priority?: EnumTicketPriorityFilter<"SupportTicket"> | $Enums.TicketPriority
    status?: EnumTicketStatusFilter<"SupportTicket"> | $Enums.TicketStatus
    title?: StringFilter<"SupportTicket"> | string
    description?: StringFilter<"SupportTicket"> | string
    estimatedResponse?: StringNullableFilter<"SupportTicket"> | string | null
    createdAt?: DateTimeFilter<"SupportTicket"> | Date | string
    updatedAt?: DateTimeFilter<"SupportTicket"> | Date | string
  }

  export type AIMessageUpsertWithWhereUniqueWithoutUserInput = {
    where: AIMessageWhereUniqueInput
    update: XOR<AIMessageUpdateWithoutUserInput, AIMessageUncheckedUpdateWithoutUserInput>
    create: XOR<AIMessageCreateWithoutUserInput, AIMessageUncheckedCreateWithoutUserInput>
  }

  export type AIMessageUpdateWithWhereUniqueWithoutUserInput = {
    where: AIMessageWhereUniqueInput
    data: XOR<AIMessageUpdateWithoutUserInput, AIMessageUncheckedUpdateWithoutUserInput>
  }

  export type AIMessageUpdateManyWithWhereWithoutUserInput = {
    where: AIMessageScalarWhereInput
    data: XOR<AIMessageUpdateManyMutationInput, AIMessageUncheckedUpdateManyWithoutUserInput>
  }

  export type AIMessageScalarWhereInput = {
    AND?: AIMessageScalarWhereInput | AIMessageScalarWhereInput[]
    OR?: AIMessageScalarWhereInput[]
    NOT?: AIMessageScalarWhereInput | AIMessageScalarWhereInput[]
    id?: StringFilter<"AIMessage"> | string
    userId?: StringFilter<"AIMessage"> | string
    propertyId?: StringFilter<"AIMessage"> | string
    role?: EnumChatRoleFilter<"AIMessage"> | $Enums.ChatRole
    content?: StringFilter<"AIMessage"> | string
    createdAt?: DateTimeFilter<"AIMessage"> | Date | string
  }

  export type UserCreateWithoutRefreshTokensInput = {
    id?: string
    email: string
    password: string
    name: string
    phone?: string | null
    address?: string | null
    role?: $Enums.Role
    isActive?: boolean
    currentPropertyId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    properties?: PropertyCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    supportTickets?: SupportTicketCreateNestedManyWithoutUserInput
    aiMessages?: AIMessageCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutRefreshTokensInput = {
    id?: string
    email: string
    password: string
    name: string
    phone?: string | null
    address?: string | null
    role?: $Enums.Role
    isActive?: boolean
    currentPropertyId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    properties?: PropertyUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    supportTickets?: SupportTicketUncheckedCreateNestedManyWithoutUserInput
    aiMessages?: AIMessageUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutRefreshTokensInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutRefreshTokensInput, UserUncheckedCreateWithoutRefreshTokensInput>
  }

  export type UserUpsertWithoutRefreshTokensInput = {
    update: XOR<UserUpdateWithoutRefreshTokensInput, UserUncheckedUpdateWithoutRefreshTokensInput>
    create: XOR<UserCreateWithoutRefreshTokensInput, UserUncheckedCreateWithoutRefreshTokensInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutRefreshTokensInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutRefreshTokensInput, UserUncheckedUpdateWithoutRefreshTokensInput>
  }

  export type UserUpdateWithoutRefreshTokensInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    currentPropertyId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    properties?: PropertyUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    supportTickets?: SupportTicketUpdateManyWithoutUserNestedInput
    aiMessages?: AIMessageUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutRefreshTokensInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    currentPropertyId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    properties?: PropertyUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    supportTickets?: SupportTicketUncheckedUpdateManyWithoutUserNestedInput
    aiMessages?: AIMessageUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutPropertiesInput = {
    id?: string
    email: string
    password: string
    name: string
    phone?: string | null
    address?: string | null
    role?: $Enums.Role
    isActive?: boolean
    currentPropertyId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    refreshTokens?: RefreshTokenCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    supportTickets?: SupportTicketCreateNestedManyWithoutUserInput
    aiMessages?: AIMessageCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutPropertiesInput = {
    id?: string
    email: string
    password: string
    name: string
    phone?: string | null
    address?: string | null
    role?: $Enums.Role
    isActive?: boolean
    currentPropertyId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    supportTickets?: SupportTicketUncheckedCreateNestedManyWithoutUserInput
    aiMessages?: AIMessageUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutPropertiesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPropertiesInput, UserUncheckedCreateWithoutPropertiesInput>
  }

  export type SurveyCreateWithoutPropertyInput = {
    id?: string
    propertyType: $Enums.PropertyType
    roofArea: number
    monthlyBill: number
    monthlyConsumption: number
    peakHours: string
    occupants: number
    appliances?: SurveyCreateappliancesInput | string[]
    status?: string
    submittedAt?: Date | string
  }

  export type SurveyUncheckedCreateWithoutPropertyInput = {
    id?: string
    propertyType: $Enums.PropertyType
    roofArea: number
    monthlyBill: number
    monthlyConsumption: number
    peakHours: string
    occupants: number
    appliances?: SurveyCreateappliancesInput | string[]
    status?: string
    submittedAt?: Date | string
  }

  export type SurveyCreateOrConnectWithoutPropertyInput = {
    where: SurveyWhereUniqueInput
    create: XOR<SurveyCreateWithoutPropertyInput, SurveyUncheckedCreateWithoutPropertyInput>
  }

  export type SurveyCreateManyPropertyInputEnvelope = {
    data: SurveyCreateManyPropertyInput | SurveyCreateManyPropertyInput[]
    skipDuplicates?: boolean
  }

  export type ProposalCreateWithoutPropertyInput = {
    id?: string
    surveyId: string
    solarCapacity: number
    batteryStorage: number
    monthlyFee: number
    estimatedSavings: number
    estimatedProduction: number
    contractDuration: number
    installationFee: number
    securityDeposit: number
    whatsIncluded?: ProposalCreatewhatsIncludedInput | string[]
    generatedAt?: Date | string
    expiresAt: Date | string
  }

  export type ProposalUncheckedCreateWithoutPropertyInput = {
    id?: string
    surveyId: string
    solarCapacity: number
    batteryStorage: number
    monthlyFee: number
    estimatedSavings: number
    estimatedProduction: number
    contractDuration: number
    installationFee: number
    securityDeposit: number
    whatsIncluded?: ProposalCreatewhatsIncludedInput | string[]
    generatedAt?: Date | string
    expiresAt: Date | string
  }

  export type ProposalCreateOrConnectWithoutPropertyInput = {
    where: ProposalWhereUniqueInput
    create: XOR<ProposalCreateWithoutPropertyInput, ProposalUncheckedCreateWithoutPropertyInput>
  }

  export type ProposalCreateManyPropertyInputEnvelope = {
    data: ProposalCreateManyPropertyInput | ProposalCreateManyPropertyInput[]
    skipDuplicates?: boolean
  }

  export type PaymentCreateWithoutPropertyInput = {
    id?: string
    proposalId?: string | null
    orderId: string
    transactionId?: string | null
    paymentMethod: $Enums.PaymentMethod
    amount: number
    currency?: string
    status?: $Enums.PaymentStatus
    signature?: string | null
    description?: string | null
    paymentGatewayUrl?: string | null
    paidAt?: Date | string | null
    createdAt?: Date | string
  }

  export type PaymentUncheckedCreateWithoutPropertyInput = {
    id?: string
    proposalId?: string | null
    orderId: string
    transactionId?: string | null
    paymentMethod: $Enums.PaymentMethod
    amount: number
    currency?: string
    status?: $Enums.PaymentStatus
    signature?: string | null
    description?: string | null
    paymentGatewayUrl?: string | null
    paidAt?: Date | string | null
    createdAt?: Date | string
  }

  export type PaymentCreateOrConnectWithoutPropertyInput = {
    where: PaymentWhereUniqueInput
    create: XOR<PaymentCreateWithoutPropertyInput, PaymentUncheckedCreateWithoutPropertyInput>
  }

  export type PaymentCreateManyPropertyInputEnvelope = {
    data: PaymentCreateManyPropertyInput | PaymentCreateManyPropertyInput[]
    skipDuplicates?: boolean
  }

  export type InstallationProgressCreateWithoutPropertyInput = {
    id?: string
    paymentConfirmed?: boolean
    paymentConfirmedAt?: Date | string | null
    engineerAssigned?: boolean
    engineerName?: string | null
    engineerPhone?: string | null
    engineerAssignedAt?: Date | string | null
    siteSurveyScheduled?: boolean
    siteSurveyDate?: Date | string | null
    installationStarted?: boolean
    installationDate?: Date | string | null
    systemActivated?: boolean
    activationDate?: Date | string | null
    estimatedCompletion?: string | null
    updatedAt?: Date | string
  }

  export type InstallationProgressUncheckedCreateWithoutPropertyInput = {
    id?: string
    paymentConfirmed?: boolean
    paymentConfirmedAt?: Date | string | null
    engineerAssigned?: boolean
    engineerName?: string | null
    engineerPhone?: string | null
    engineerAssignedAt?: Date | string | null
    siteSurveyScheduled?: boolean
    siteSurveyDate?: Date | string | null
    installationStarted?: boolean
    installationDate?: Date | string | null
    systemActivated?: boolean
    activationDate?: Date | string | null
    estimatedCompletion?: string | null
    updatedAt?: Date | string
  }

  export type InstallationProgressCreateOrConnectWithoutPropertyInput = {
    where: InstallationProgressWhereUniqueInput
    create: XOR<InstallationProgressCreateWithoutPropertyInput, InstallationProgressUncheckedCreateWithoutPropertyInput>
  }

  export type EnergyStatCreateWithoutPropertyInput = {
    id?: string
    date?: Date | string
    period: string
    production: number
    consumption: number
    gridUsage: number
    batteryPercent?: number | null
    solarKw?: number | null
    gridKw?: number | null
    exporting?: boolean | null
  }

  export type EnergyStatUncheckedCreateWithoutPropertyInput = {
    id?: string
    date?: Date | string
    period: string
    production: number
    consumption: number
    gridUsage: number
    batteryPercent?: number | null
    solarKw?: number | null
    gridKw?: number | null
    exporting?: boolean | null
  }

  export type EnergyStatCreateOrConnectWithoutPropertyInput = {
    where: EnergyStatWhereUniqueInput
    create: XOR<EnergyStatCreateWithoutPropertyInput, EnergyStatUncheckedCreateWithoutPropertyInput>
  }

  export type EnergyStatCreateManyPropertyInputEnvelope = {
    data: EnergyStatCreateManyPropertyInput | EnergyStatCreateManyPropertyInput[]
    skipDuplicates?: boolean
  }

  export type AlertCreateWithoutPropertyInput = {
    id?: string
    category: $Enums.AlertCategory
    severity: $Enums.AlertSeverity
    title: string
    message: string
    read?: boolean
    createdAt?: Date | string
  }

  export type AlertUncheckedCreateWithoutPropertyInput = {
    id?: string
    category: $Enums.AlertCategory
    severity: $Enums.AlertSeverity
    title: string
    message: string
    read?: boolean
    createdAt?: Date | string
  }

  export type AlertCreateOrConnectWithoutPropertyInput = {
    where: AlertWhereUniqueInput
    create: XOR<AlertCreateWithoutPropertyInput, AlertUncheckedCreateWithoutPropertyInput>
  }

  export type AlertCreateManyPropertyInputEnvelope = {
    data: AlertCreateManyPropertyInput | AlertCreateManyPropertyInput[]
    skipDuplicates?: boolean
  }

  export type BillCreateWithoutPropertyInput = {
    id?: string
    month: string
    totalAmount: number
    subscriptionFee: number
    usageCharge: number
    taxes: number
    status?: $Enums.BillStatus
    dueDate: Date | string
    generatedAt?: Date | string
    paidDate?: Date | string | null
    pdfUrl?: string | null
  }

  export type BillUncheckedCreateWithoutPropertyInput = {
    id?: string
    month: string
    totalAmount: number
    subscriptionFee: number
    usageCharge: number
    taxes: number
    status?: $Enums.BillStatus
    dueDate: Date | string
    generatedAt?: Date | string
    paidDate?: Date | string | null
    pdfUrl?: string | null
  }

  export type BillCreateOrConnectWithoutPropertyInput = {
    where: BillWhereUniqueInput
    create: XOR<BillCreateWithoutPropertyInput, BillUncheckedCreateWithoutPropertyInput>
  }

  export type BillCreateManyPropertyInputEnvelope = {
    data: BillCreateManyPropertyInput | BillCreateManyPropertyInput[]
    skipDuplicates?: boolean
  }

  export type SupportTicketCreateWithoutPropertyInput = {
    id?: string
    category: $Enums.TicketCategory
    priority: $Enums.TicketPriority
    status?: $Enums.TicketStatus
    title: string
    description: string
    estimatedResponse?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutSupportTicketsInput
  }

  export type SupportTicketUncheckedCreateWithoutPropertyInput = {
    id?: string
    userId: string
    category: $Enums.TicketCategory
    priority: $Enums.TicketPriority
    status?: $Enums.TicketStatus
    title: string
    description: string
    estimatedResponse?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SupportTicketCreateOrConnectWithoutPropertyInput = {
    where: SupportTicketWhereUniqueInput
    create: XOR<SupportTicketCreateWithoutPropertyInput, SupportTicketUncheckedCreateWithoutPropertyInput>
  }

  export type SupportTicketCreateManyPropertyInputEnvelope = {
    data: SupportTicketCreateManyPropertyInput | SupportTicketCreateManyPropertyInput[]
    skipDuplicates?: boolean
  }

  export type AIMessageCreateWithoutPropertyInput = {
    id?: string
    role: $Enums.ChatRole
    content: string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutAiMessagesInput
  }

  export type AIMessageUncheckedCreateWithoutPropertyInput = {
    id?: string
    userId: string
    role: $Enums.ChatRole
    content: string
    createdAt?: Date | string
  }

  export type AIMessageCreateOrConnectWithoutPropertyInput = {
    where: AIMessageWhereUniqueInput
    create: XOR<AIMessageCreateWithoutPropertyInput, AIMessageUncheckedCreateWithoutPropertyInput>
  }

  export type AIMessageCreateManyPropertyInputEnvelope = {
    data: AIMessageCreateManyPropertyInput | AIMessageCreateManyPropertyInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutPropertiesInput = {
    update: XOR<UserUpdateWithoutPropertiesInput, UserUncheckedUpdateWithoutPropertiesInput>
    create: XOR<UserCreateWithoutPropertiesInput, UserUncheckedCreateWithoutPropertiesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPropertiesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPropertiesInput, UserUncheckedUpdateWithoutPropertiesInput>
  }

  export type UserUpdateWithoutPropertiesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    currentPropertyId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    refreshTokens?: RefreshTokenUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    supportTickets?: SupportTicketUpdateManyWithoutUserNestedInput
    aiMessages?: AIMessageUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutPropertiesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    currentPropertyId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    supportTickets?: SupportTicketUncheckedUpdateManyWithoutUserNestedInput
    aiMessages?: AIMessageUncheckedUpdateManyWithoutUserNestedInput
  }

  export type SurveyUpsertWithWhereUniqueWithoutPropertyInput = {
    where: SurveyWhereUniqueInput
    update: XOR<SurveyUpdateWithoutPropertyInput, SurveyUncheckedUpdateWithoutPropertyInput>
    create: XOR<SurveyCreateWithoutPropertyInput, SurveyUncheckedCreateWithoutPropertyInput>
  }

  export type SurveyUpdateWithWhereUniqueWithoutPropertyInput = {
    where: SurveyWhereUniqueInput
    data: XOR<SurveyUpdateWithoutPropertyInput, SurveyUncheckedUpdateWithoutPropertyInput>
  }

  export type SurveyUpdateManyWithWhereWithoutPropertyInput = {
    where: SurveyScalarWhereInput
    data: XOR<SurveyUpdateManyMutationInput, SurveyUncheckedUpdateManyWithoutPropertyInput>
  }

  export type SurveyScalarWhereInput = {
    AND?: SurveyScalarWhereInput | SurveyScalarWhereInput[]
    OR?: SurveyScalarWhereInput[]
    NOT?: SurveyScalarWhereInput | SurveyScalarWhereInput[]
    id?: StringFilter<"Survey"> | string
    propertyId?: StringFilter<"Survey"> | string
    propertyType?: EnumPropertyTypeFilter<"Survey"> | $Enums.PropertyType
    roofArea?: FloatFilter<"Survey"> | number
    monthlyBill?: FloatFilter<"Survey"> | number
    monthlyConsumption?: FloatFilter<"Survey"> | number
    peakHours?: StringFilter<"Survey"> | string
    occupants?: IntFilter<"Survey"> | number
    appliances?: StringNullableListFilter<"Survey">
    status?: StringFilter<"Survey"> | string
    submittedAt?: DateTimeFilter<"Survey"> | Date | string
  }

  export type ProposalUpsertWithWhereUniqueWithoutPropertyInput = {
    where: ProposalWhereUniqueInput
    update: XOR<ProposalUpdateWithoutPropertyInput, ProposalUncheckedUpdateWithoutPropertyInput>
    create: XOR<ProposalCreateWithoutPropertyInput, ProposalUncheckedCreateWithoutPropertyInput>
  }

  export type ProposalUpdateWithWhereUniqueWithoutPropertyInput = {
    where: ProposalWhereUniqueInput
    data: XOR<ProposalUpdateWithoutPropertyInput, ProposalUncheckedUpdateWithoutPropertyInput>
  }

  export type ProposalUpdateManyWithWhereWithoutPropertyInput = {
    where: ProposalScalarWhereInput
    data: XOR<ProposalUpdateManyMutationInput, ProposalUncheckedUpdateManyWithoutPropertyInput>
  }

  export type ProposalScalarWhereInput = {
    AND?: ProposalScalarWhereInput | ProposalScalarWhereInput[]
    OR?: ProposalScalarWhereInput[]
    NOT?: ProposalScalarWhereInput | ProposalScalarWhereInput[]
    id?: StringFilter<"Proposal"> | string
    propertyId?: StringFilter<"Proposal"> | string
    surveyId?: StringFilter<"Proposal"> | string
    solarCapacity?: FloatFilter<"Proposal"> | number
    batteryStorage?: FloatFilter<"Proposal"> | number
    monthlyFee?: FloatFilter<"Proposal"> | number
    estimatedSavings?: FloatFilter<"Proposal"> | number
    estimatedProduction?: FloatFilter<"Proposal"> | number
    contractDuration?: IntFilter<"Proposal"> | number
    installationFee?: FloatFilter<"Proposal"> | number
    securityDeposit?: FloatFilter<"Proposal"> | number
    whatsIncluded?: StringNullableListFilter<"Proposal">
    generatedAt?: DateTimeFilter<"Proposal"> | Date | string
    expiresAt?: DateTimeFilter<"Proposal"> | Date | string
  }

  export type PaymentUpsertWithWhereUniqueWithoutPropertyInput = {
    where: PaymentWhereUniqueInput
    update: XOR<PaymentUpdateWithoutPropertyInput, PaymentUncheckedUpdateWithoutPropertyInput>
    create: XOR<PaymentCreateWithoutPropertyInput, PaymentUncheckedCreateWithoutPropertyInput>
  }

  export type PaymentUpdateWithWhereUniqueWithoutPropertyInput = {
    where: PaymentWhereUniqueInput
    data: XOR<PaymentUpdateWithoutPropertyInput, PaymentUncheckedUpdateWithoutPropertyInput>
  }

  export type PaymentUpdateManyWithWhereWithoutPropertyInput = {
    where: PaymentScalarWhereInput
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyWithoutPropertyInput>
  }

  export type PaymentScalarWhereInput = {
    AND?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
    OR?: PaymentScalarWhereInput[]
    NOT?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
    id?: StringFilter<"Payment"> | string
    propertyId?: StringFilter<"Payment"> | string
    proposalId?: StringNullableFilter<"Payment"> | string | null
    orderId?: StringFilter<"Payment"> | string
    transactionId?: StringNullableFilter<"Payment"> | string | null
    paymentMethod?: EnumPaymentMethodFilter<"Payment"> | $Enums.PaymentMethod
    amount?: FloatFilter<"Payment"> | number
    currency?: StringFilter<"Payment"> | string
    status?: EnumPaymentStatusFilter<"Payment"> | $Enums.PaymentStatus
    signature?: StringNullableFilter<"Payment"> | string | null
    description?: StringNullableFilter<"Payment"> | string | null
    paymentGatewayUrl?: StringNullableFilter<"Payment"> | string | null
    paidAt?: DateTimeNullableFilter<"Payment"> | Date | string | null
    createdAt?: DateTimeFilter<"Payment"> | Date | string
  }

  export type InstallationProgressUpsertWithoutPropertyInput = {
    update: XOR<InstallationProgressUpdateWithoutPropertyInput, InstallationProgressUncheckedUpdateWithoutPropertyInput>
    create: XOR<InstallationProgressCreateWithoutPropertyInput, InstallationProgressUncheckedCreateWithoutPropertyInput>
    where?: InstallationProgressWhereInput
  }

  export type InstallationProgressUpdateToOneWithWhereWithoutPropertyInput = {
    where?: InstallationProgressWhereInput
    data: XOR<InstallationProgressUpdateWithoutPropertyInput, InstallationProgressUncheckedUpdateWithoutPropertyInput>
  }

  export type InstallationProgressUpdateWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    paymentConfirmed?: BoolFieldUpdateOperationsInput | boolean
    paymentConfirmedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    engineerAssigned?: BoolFieldUpdateOperationsInput | boolean
    engineerName?: NullableStringFieldUpdateOperationsInput | string | null
    engineerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    engineerAssignedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    siteSurveyScheduled?: BoolFieldUpdateOperationsInput | boolean
    siteSurveyDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    installationStarted?: BoolFieldUpdateOperationsInput | boolean
    installationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    systemActivated?: BoolFieldUpdateOperationsInput | boolean
    activationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estimatedCompletion?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InstallationProgressUncheckedUpdateWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    paymentConfirmed?: BoolFieldUpdateOperationsInput | boolean
    paymentConfirmedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    engineerAssigned?: BoolFieldUpdateOperationsInput | boolean
    engineerName?: NullableStringFieldUpdateOperationsInput | string | null
    engineerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    engineerAssignedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    siteSurveyScheduled?: BoolFieldUpdateOperationsInput | boolean
    siteSurveyDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    installationStarted?: BoolFieldUpdateOperationsInput | boolean
    installationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    systemActivated?: BoolFieldUpdateOperationsInput | boolean
    activationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estimatedCompletion?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EnergyStatUpsertWithWhereUniqueWithoutPropertyInput = {
    where: EnergyStatWhereUniqueInput
    update: XOR<EnergyStatUpdateWithoutPropertyInput, EnergyStatUncheckedUpdateWithoutPropertyInput>
    create: XOR<EnergyStatCreateWithoutPropertyInput, EnergyStatUncheckedCreateWithoutPropertyInput>
  }

  export type EnergyStatUpdateWithWhereUniqueWithoutPropertyInput = {
    where: EnergyStatWhereUniqueInput
    data: XOR<EnergyStatUpdateWithoutPropertyInput, EnergyStatUncheckedUpdateWithoutPropertyInput>
  }

  export type EnergyStatUpdateManyWithWhereWithoutPropertyInput = {
    where: EnergyStatScalarWhereInput
    data: XOR<EnergyStatUpdateManyMutationInput, EnergyStatUncheckedUpdateManyWithoutPropertyInput>
  }

  export type EnergyStatScalarWhereInput = {
    AND?: EnergyStatScalarWhereInput | EnergyStatScalarWhereInput[]
    OR?: EnergyStatScalarWhereInput[]
    NOT?: EnergyStatScalarWhereInput | EnergyStatScalarWhereInput[]
    id?: StringFilter<"EnergyStat"> | string
    propertyId?: StringFilter<"EnergyStat"> | string
    date?: DateTimeFilter<"EnergyStat"> | Date | string
    period?: StringFilter<"EnergyStat"> | string
    production?: FloatFilter<"EnergyStat"> | number
    consumption?: FloatFilter<"EnergyStat"> | number
    gridUsage?: FloatFilter<"EnergyStat"> | number
    batteryPercent?: FloatNullableFilter<"EnergyStat"> | number | null
    solarKw?: FloatNullableFilter<"EnergyStat"> | number | null
    gridKw?: FloatNullableFilter<"EnergyStat"> | number | null
    exporting?: BoolNullableFilter<"EnergyStat"> | boolean | null
  }

  export type AlertUpsertWithWhereUniqueWithoutPropertyInput = {
    where: AlertWhereUniqueInput
    update: XOR<AlertUpdateWithoutPropertyInput, AlertUncheckedUpdateWithoutPropertyInput>
    create: XOR<AlertCreateWithoutPropertyInput, AlertUncheckedCreateWithoutPropertyInput>
  }

  export type AlertUpdateWithWhereUniqueWithoutPropertyInput = {
    where: AlertWhereUniqueInput
    data: XOR<AlertUpdateWithoutPropertyInput, AlertUncheckedUpdateWithoutPropertyInput>
  }

  export type AlertUpdateManyWithWhereWithoutPropertyInput = {
    where: AlertScalarWhereInput
    data: XOR<AlertUpdateManyMutationInput, AlertUncheckedUpdateManyWithoutPropertyInput>
  }

  export type AlertScalarWhereInput = {
    AND?: AlertScalarWhereInput | AlertScalarWhereInput[]
    OR?: AlertScalarWhereInput[]
    NOT?: AlertScalarWhereInput | AlertScalarWhereInput[]
    id?: StringFilter<"Alert"> | string
    propertyId?: StringFilter<"Alert"> | string
    category?: EnumAlertCategoryFilter<"Alert"> | $Enums.AlertCategory
    severity?: EnumAlertSeverityFilter<"Alert"> | $Enums.AlertSeverity
    title?: StringFilter<"Alert"> | string
    message?: StringFilter<"Alert"> | string
    read?: BoolFilter<"Alert"> | boolean
    createdAt?: DateTimeFilter<"Alert"> | Date | string
  }

  export type BillUpsertWithWhereUniqueWithoutPropertyInput = {
    where: BillWhereUniqueInput
    update: XOR<BillUpdateWithoutPropertyInput, BillUncheckedUpdateWithoutPropertyInput>
    create: XOR<BillCreateWithoutPropertyInput, BillUncheckedCreateWithoutPropertyInput>
  }

  export type BillUpdateWithWhereUniqueWithoutPropertyInput = {
    where: BillWhereUniqueInput
    data: XOR<BillUpdateWithoutPropertyInput, BillUncheckedUpdateWithoutPropertyInput>
  }

  export type BillUpdateManyWithWhereWithoutPropertyInput = {
    where: BillScalarWhereInput
    data: XOR<BillUpdateManyMutationInput, BillUncheckedUpdateManyWithoutPropertyInput>
  }

  export type BillScalarWhereInput = {
    AND?: BillScalarWhereInput | BillScalarWhereInput[]
    OR?: BillScalarWhereInput[]
    NOT?: BillScalarWhereInput | BillScalarWhereInput[]
    id?: StringFilter<"Bill"> | string
    propertyId?: StringFilter<"Bill"> | string
    month?: StringFilter<"Bill"> | string
    totalAmount?: FloatFilter<"Bill"> | number
    subscriptionFee?: FloatFilter<"Bill"> | number
    usageCharge?: FloatFilter<"Bill"> | number
    taxes?: FloatFilter<"Bill"> | number
    status?: EnumBillStatusFilter<"Bill"> | $Enums.BillStatus
    dueDate?: DateTimeFilter<"Bill"> | Date | string
    generatedAt?: DateTimeFilter<"Bill"> | Date | string
    paidDate?: DateTimeNullableFilter<"Bill"> | Date | string | null
    pdfUrl?: StringNullableFilter<"Bill"> | string | null
  }

  export type SupportTicketUpsertWithWhereUniqueWithoutPropertyInput = {
    where: SupportTicketWhereUniqueInput
    update: XOR<SupportTicketUpdateWithoutPropertyInput, SupportTicketUncheckedUpdateWithoutPropertyInput>
    create: XOR<SupportTicketCreateWithoutPropertyInput, SupportTicketUncheckedCreateWithoutPropertyInput>
  }

  export type SupportTicketUpdateWithWhereUniqueWithoutPropertyInput = {
    where: SupportTicketWhereUniqueInput
    data: XOR<SupportTicketUpdateWithoutPropertyInput, SupportTicketUncheckedUpdateWithoutPropertyInput>
  }

  export type SupportTicketUpdateManyWithWhereWithoutPropertyInput = {
    where: SupportTicketScalarWhereInput
    data: XOR<SupportTicketUpdateManyMutationInput, SupportTicketUncheckedUpdateManyWithoutPropertyInput>
  }

  export type AIMessageUpsertWithWhereUniqueWithoutPropertyInput = {
    where: AIMessageWhereUniqueInput
    update: XOR<AIMessageUpdateWithoutPropertyInput, AIMessageUncheckedUpdateWithoutPropertyInput>
    create: XOR<AIMessageCreateWithoutPropertyInput, AIMessageUncheckedCreateWithoutPropertyInput>
  }

  export type AIMessageUpdateWithWhereUniqueWithoutPropertyInput = {
    where: AIMessageWhereUniqueInput
    data: XOR<AIMessageUpdateWithoutPropertyInput, AIMessageUncheckedUpdateWithoutPropertyInput>
  }

  export type AIMessageUpdateManyWithWhereWithoutPropertyInput = {
    where: AIMessageScalarWhereInput
    data: XOR<AIMessageUpdateManyMutationInput, AIMessageUncheckedUpdateManyWithoutPropertyInput>
  }

  export type PropertyCreateWithoutSurveysInput = {
    id?: string
    name: string
    address: string
    type: $Enums.PropertyType
    subscriptionStatus?: $Enums.SubscriptionStatus
    planType?: string | null
    solarCapacity?: number | null
    batteryStorage?: number | null
    installationDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutPropertiesInput
    proposals?: ProposalCreateNestedManyWithoutPropertyInput
    payments?: PaymentCreateNestedManyWithoutPropertyInput
    installation?: InstallationProgressCreateNestedOneWithoutPropertyInput
    energyStats?: EnergyStatCreateNestedManyWithoutPropertyInput
    alerts?: AlertCreateNestedManyWithoutPropertyInput
    bills?: BillCreateNestedManyWithoutPropertyInput
    supportTickets?: SupportTicketCreateNestedManyWithoutPropertyInput
    aiMessages?: AIMessageCreateNestedManyWithoutPropertyInput
  }

  export type PropertyUncheckedCreateWithoutSurveysInput = {
    id?: string
    userId: string
    name: string
    address: string
    type: $Enums.PropertyType
    subscriptionStatus?: $Enums.SubscriptionStatus
    planType?: string | null
    solarCapacity?: number | null
    batteryStorage?: number | null
    installationDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    proposals?: ProposalUncheckedCreateNestedManyWithoutPropertyInput
    payments?: PaymentUncheckedCreateNestedManyWithoutPropertyInput
    installation?: InstallationProgressUncheckedCreateNestedOneWithoutPropertyInput
    energyStats?: EnergyStatUncheckedCreateNestedManyWithoutPropertyInput
    alerts?: AlertUncheckedCreateNestedManyWithoutPropertyInput
    bills?: BillUncheckedCreateNestedManyWithoutPropertyInput
    supportTickets?: SupportTicketUncheckedCreateNestedManyWithoutPropertyInput
    aiMessages?: AIMessageUncheckedCreateNestedManyWithoutPropertyInput
  }

  export type PropertyCreateOrConnectWithoutSurveysInput = {
    where: PropertyWhereUniqueInput
    create: XOR<PropertyCreateWithoutSurveysInput, PropertyUncheckedCreateWithoutSurveysInput>
  }

  export type PropertyUpsertWithoutSurveysInput = {
    update: XOR<PropertyUpdateWithoutSurveysInput, PropertyUncheckedUpdateWithoutSurveysInput>
    create: XOR<PropertyCreateWithoutSurveysInput, PropertyUncheckedCreateWithoutSurveysInput>
    where?: PropertyWhereInput
  }

  export type PropertyUpdateToOneWithWhereWithoutSurveysInput = {
    where?: PropertyWhereInput
    data: XOR<PropertyUpdateWithoutSurveysInput, PropertyUncheckedUpdateWithoutSurveysInput>
  }

  export type PropertyUpdateWithoutSurveysInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    type?: EnumPropertyTypeFieldUpdateOperationsInput | $Enums.PropertyType
    subscriptionStatus?: EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus
    planType?: NullableStringFieldUpdateOperationsInput | string | null
    solarCapacity?: NullableFloatFieldUpdateOperationsInput | number | null
    batteryStorage?: NullableFloatFieldUpdateOperationsInput | number | null
    installationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPropertiesNestedInput
    proposals?: ProposalUpdateManyWithoutPropertyNestedInput
    payments?: PaymentUpdateManyWithoutPropertyNestedInput
    installation?: InstallationProgressUpdateOneWithoutPropertyNestedInput
    energyStats?: EnergyStatUpdateManyWithoutPropertyNestedInput
    alerts?: AlertUpdateManyWithoutPropertyNestedInput
    bills?: BillUpdateManyWithoutPropertyNestedInput
    supportTickets?: SupportTicketUpdateManyWithoutPropertyNestedInput
    aiMessages?: AIMessageUpdateManyWithoutPropertyNestedInput
  }

  export type PropertyUncheckedUpdateWithoutSurveysInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    type?: EnumPropertyTypeFieldUpdateOperationsInput | $Enums.PropertyType
    subscriptionStatus?: EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus
    planType?: NullableStringFieldUpdateOperationsInput | string | null
    solarCapacity?: NullableFloatFieldUpdateOperationsInput | number | null
    batteryStorage?: NullableFloatFieldUpdateOperationsInput | number | null
    installationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    proposals?: ProposalUncheckedUpdateManyWithoutPropertyNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutPropertyNestedInput
    installation?: InstallationProgressUncheckedUpdateOneWithoutPropertyNestedInput
    energyStats?: EnergyStatUncheckedUpdateManyWithoutPropertyNestedInput
    alerts?: AlertUncheckedUpdateManyWithoutPropertyNestedInput
    bills?: BillUncheckedUpdateManyWithoutPropertyNestedInput
    supportTickets?: SupportTicketUncheckedUpdateManyWithoutPropertyNestedInput
    aiMessages?: AIMessageUncheckedUpdateManyWithoutPropertyNestedInput
  }

  export type PropertyCreateWithoutProposalsInput = {
    id?: string
    name: string
    address: string
    type: $Enums.PropertyType
    subscriptionStatus?: $Enums.SubscriptionStatus
    planType?: string | null
    solarCapacity?: number | null
    batteryStorage?: number | null
    installationDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutPropertiesInput
    surveys?: SurveyCreateNestedManyWithoutPropertyInput
    payments?: PaymentCreateNestedManyWithoutPropertyInput
    installation?: InstallationProgressCreateNestedOneWithoutPropertyInput
    energyStats?: EnergyStatCreateNestedManyWithoutPropertyInput
    alerts?: AlertCreateNestedManyWithoutPropertyInput
    bills?: BillCreateNestedManyWithoutPropertyInput
    supportTickets?: SupportTicketCreateNestedManyWithoutPropertyInput
    aiMessages?: AIMessageCreateNestedManyWithoutPropertyInput
  }

  export type PropertyUncheckedCreateWithoutProposalsInput = {
    id?: string
    userId: string
    name: string
    address: string
    type: $Enums.PropertyType
    subscriptionStatus?: $Enums.SubscriptionStatus
    planType?: string | null
    solarCapacity?: number | null
    batteryStorage?: number | null
    installationDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    surveys?: SurveyUncheckedCreateNestedManyWithoutPropertyInput
    payments?: PaymentUncheckedCreateNestedManyWithoutPropertyInput
    installation?: InstallationProgressUncheckedCreateNestedOneWithoutPropertyInput
    energyStats?: EnergyStatUncheckedCreateNestedManyWithoutPropertyInput
    alerts?: AlertUncheckedCreateNestedManyWithoutPropertyInput
    bills?: BillUncheckedCreateNestedManyWithoutPropertyInput
    supportTickets?: SupportTicketUncheckedCreateNestedManyWithoutPropertyInput
    aiMessages?: AIMessageUncheckedCreateNestedManyWithoutPropertyInput
  }

  export type PropertyCreateOrConnectWithoutProposalsInput = {
    where: PropertyWhereUniqueInput
    create: XOR<PropertyCreateWithoutProposalsInput, PropertyUncheckedCreateWithoutProposalsInput>
  }

  export type PropertyUpsertWithoutProposalsInput = {
    update: XOR<PropertyUpdateWithoutProposalsInput, PropertyUncheckedUpdateWithoutProposalsInput>
    create: XOR<PropertyCreateWithoutProposalsInput, PropertyUncheckedCreateWithoutProposalsInput>
    where?: PropertyWhereInput
  }

  export type PropertyUpdateToOneWithWhereWithoutProposalsInput = {
    where?: PropertyWhereInput
    data: XOR<PropertyUpdateWithoutProposalsInput, PropertyUncheckedUpdateWithoutProposalsInput>
  }

  export type PropertyUpdateWithoutProposalsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    type?: EnumPropertyTypeFieldUpdateOperationsInput | $Enums.PropertyType
    subscriptionStatus?: EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus
    planType?: NullableStringFieldUpdateOperationsInput | string | null
    solarCapacity?: NullableFloatFieldUpdateOperationsInput | number | null
    batteryStorage?: NullableFloatFieldUpdateOperationsInput | number | null
    installationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPropertiesNestedInput
    surveys?: SurveyUpdateManyWithoutPropertyNestedInput
    payments?: PaymentUpdateManyWithoutPropertyNestedInput
    installation?: InstallationProgressUpdateOneWithoutPropertyNestedInput
    energyStats?: EnergyStatUpdateManyWithoutPropertyNestedInput
    alerts?: AlertUpdateManyWithoutPropertyNestedInput
    bills?: BillUpdateManyWithoutPropertyNestedInput
    supportTickets?: SupportTicketUpdateManyWithoutPropertyNestedInput
    aiMessages?: AIMessageUpdateManyWithoutPropertyNestedInput
  }

  export type PropertyUncheckedUpdateWithoutProposalsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    type?: EnumPropertyTypeFieldUpdateOperationsInput | $Enums.PropertyType
    subscriptionStatus?: EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus
    planType?: NullableStringFieldUpdateOperationsInput | string | null
    solarCapacity?: NullableFloatFieldUpdateOperationsInput | number | null
    batteryStorage?: NullableFloatFieldUpdateOperationsInput | number | null
    installationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    surveys?: SurveyUncheckedUpdateManyWithoutPropertyNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutPropertyNestedInput
    installation?: InstallationProgressUncheckedUpdateOneWithoutPropertyNestedInput
    energyStats?: EnergyStatUncheckedUpdateManyWithoutPropertyNestedInput
    alerts?: AlertUncheckedUpdateManyWithoutPropertyNestedInput
    bills?: BillUncheckedUpdateManyWithoutPropertyNestedInput
    supportTickets?: SupportTicketUncheckedUpdateManyWithoutPropertyNestedInput
    aiMessages?: AIMessageUncheckedUpdateManyWithoutPropertyNestedInput
  }

  export type PropertyCreateWithoutPaymentsInput = {
    id?: string
    name: string
    address: string
    type: $Enums.PropertyType
    subscriptionStatus?: $Enums.SubscriptionStatus
    planType?: string | null
    solarCapacity?: number | null
    batteryStorage?: number | null
    installationDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutPropertiesInput
    surveys?: SurveyCreateNestedManyWithoutPropertyInput
    proposals?: ProposalCreateNestedManyWithoutPropertyInput
    installation?: InstallationProgressCreateNestedOneWithoutPropertyInput
    energyStats?: EnergyStatCreateNestedManyWithoutPropertyInput
    alerts?: AlertCreateNestedManyWithoutPropertyInput
    bills?: BillCreateNestedManyWithoutPropertyInput
    supportTickets?: SupportTicketCreateNestedManyWithoutPropertyInput
    aiMessages?: AIMessageCreateNestedManyWithoutPropertyInput
  }

  export type PropertyUncheckedCreateWithoutPaymentsInput = {
    id?: string
    userId: string
    name: string
    address: string
    type: $Enums.PropertyType
    subscriptionStatus?: $Enums.SubscriptionStatus
    planType?: string | null
    solarCapacity?: number | null
    batteryStorage?: number | null
    installationDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    surveys?: SurveyUncheckedCreateNestedManyWithoutPropertyInput
    proposals?: ProposalUncheckedCreateNestedManyWithoutPropertyInput
    installation?: InstallationProgressUncheckedCreateNestedOneWithoutPropertyInput
    energyStats?: EnergyStatUncheckedCreateNestedManyWithoutPropertyInput
    alerts?: AlertUncheckedCreateNestedManyWithoutPropertyInput
    bills?: BillUncheckedCreateNestedManyWithoutPropertyInput
    supportTickets?: SupportTicketUncheckedCreateNestedManyWithoutPropertyInput
    aiMessages?: AIMessageUncheckedCreateNestedManyWithoutPropertyInput
  }

  export type PropertyCreateOrConnectWithoutPaymentsInput = {
    where: PropertyWhereUniqueInput
    create: XOR<PropertyCreateWithoutPaymentsInput, PropertyUncheckedCreateWithoutPaymentsInput>
  }

  export type PropertyUpsertWithoutPaymentsInput = {
    update: XOR<PropertyUpdateWithoutPaymentsInput, PropertyUncheckedUpdateWithoutPaymentsInput>
    create: XOR<PropertyCreateWithoutPaymentsInput, PropertyUncheckedCreateWithoutPaymentsInput>
    where?: PropertyWhereInput
  }

  export type PropertyUpdateToOneWithWhereWithoutPaymentsInput = {
    where?: PropertyWhereInput
    data: XOR<PropertyUpdateWithoutPaymentsInput, PropertyUncheckedUpdateWithoutPaymentsInput>
  }

  export type PropertyUpdateWithoutPaymentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    type?: EnumPropertyTypeFieldUpdateOperationsInput | $Enums.PropertyType
    subscriptionStatus?: EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus
    planType?: NullableStringFieldUpdateOperationsInput | string | null
    solarCapacity?: NullableFloatFieldUpdateOperationsInput | number | null
    batteryStorage?: NullableFloatFieldUpdateOperationsInput | number | null
    installationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPropertiesNestedInput
    surveys?: SurveyUpdateManyWithoutPropertyNestedInput
    proposals?: ProposalUpdateManyWithoutPropertyNestedInput
    installation?: InstallationProgressUpdateOneWithoutPropertyNestedInput
    energyStats?: EnergyStatUpdateManyWithoutPropertyNestedInput
    alerts?: AlertUpdateManyWithoutPropertyNestedInput
    bills?: BillUpdateManyWithoutPropertyNestedInput
    supportTickets?: SupportTicketUpdateManyWithoutPropertyNestedInput
    aiMessages?: AIMessageUpdateManyWithoutPropertyNestedInput
  }

  export type PropertyUncheckedUpdateWithoutPaymentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    type?: EnumPropertyTypeFieldUpdateOperationsInput | $Enums.PropertyType
    subscriptionStatus?: EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus
    planType?: NullableStringFieldUpdateOperationsInput | string | null
    solarCapacity?: NullableFloatFieldUpdateOperationsInput | number | null
    batteryStorage?: NullableFloatFieldUpdateOperationsInput | number | null
    installationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    surveys?: SurveyUncheckedUpdateManyWithoutPropertyNestedInput
    proposals?: ProposalUncheckedUpdateManyWithoutPropertyNestedInput
    installation?: InstallationProgressUncheckedUpdateOneWithoutPropertyNestedInput
    energyStats?: EnergyStatUncheckedUpdateManyWithoutPropertyNestedInput
    alerts?: AlertUncheckedUpdateManyWithoutPropertyNestedInput
    bills?: BillUncheckedUpdateManyWithoutPropertyNestedInput
    supportTickets?: SupportTicketUncheckedUpdateManyWithoutPropertyNestedInput
    aiMessages?: AIMessageUncheckedUpdateManyWithoutPropertyNestedInput
  }

  export type PropertyCreateWithoutInstallationInput = {
    id?: string
    name: string
    address: string
    type: $Enums.PropertyType
    subscriptionStatus?: $Enums.SubscriptionStatus
    planType?: string | null
    solarCapacity?: number | null
    batteryStorage?: number | null
    installationDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutPropertiesInput
    surveys?: SurveyCreateNestedManyWithoutPropertyInput
    proposals?: ProposalCreateNestedManyWithoutPropertyInput
    payments?: PaymentCreateNestedManyWithoutPropertyInput
    energyStats?: EnergyStatCreateNestedManyWithoutPropertyInput
    alerts?: AlertCreateNestedManyWithoutPropertyInput
    bills?: BillCreateNestedManyWithoutPropertyInput
    supportTickets?: SupportTicketCreateNestedManyWithoutPropertyInput
    aiMessages?: AIMessageCreateNestedManyWithoutPropertyInput
  }

  export type PropertyUncheckedCreateWithoutInstallationInput = {
    id?: string
    userId: string
    name: string
    address: string
    type: $Enums.PropertyType
    subscriptionStatus?: $Enums.SubscriptionStatus
    planType?: string | null
    solarCapacity?: number | null
    batteryStorage?: number | null
    installationDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    surveys?: SurveyUncheckedCreateNestedManyWithoutPropertyInput
    proposals?: ProposalUncheckedCreateNestedManyWithoutPropertyInput
    payments?: PaymentUncheckedCreateNestedManyWithoutPropertyInput
    energyStats?: EnergyStatUncheckedCreateNestedManyWithoutPropertyInput
    alerts?: AlertUncheckedCreateNestedManyWithoutPropertyInput
    bills?: BillUncheckedCreateNestedManyWithoutPropertyInput
    supportTickets?: SupportTicketUncheckedCreateNestedManyWithoutPropertyInput
    aiMessages?: AIMessageUncheckedCreateNestedManyWithoutPropertyInput
  }

  export type PropertyCreateOrConnectWithoutInstallationInput = {
    where: PropertyWhereUniqueInput
    create: XOR<PropertyCreateWithoutInstallationInput, PropertyUncheckedCreateWithoutInstallationInput>
  }

  export type PropertyUpsertWithoutInstallationInput = {
    update: XOR<PropertyUpdateWithoutInstallationInput, PropertyUncheckedUpdateWithoutInstallationInput>
    create: XOR<PropertyCreateWithoutInstallationInput, PropertyUncheckedCreateWithoutInstallationInput>
    where?: PropertyWhereInput
  }

  export type PropertyUpdateToOneWithWhereWithoutInstallationInput = {
    where?: PropertyWhereInput
    data: XOR<PropertyUpdateWithoutInstallationInput, PropertyUncheckedUpdateWithoutInstallationInput>
  }

  export type PropertyUpdateWithoutInstallationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    type?: EnumPropertyTypeFieldUpdateOperationsInput | $Enums.PropertyType
    subscriptionStatus?: EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus
    planType?: NullableStringFieldUpdateOperationsInput | string | null
    solarCapacity?: NullableFloatFieldUpdateOperationsInput | number | null
    batteryStorage?: NullableFloatFieldUpdateOperationsInput | number | null
    installationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPropertiesNestedInput
    surveys?: SurveyUpdateManyWithoutPropertyNestedInput
    proposals?: ProposalUpdateManyWithoutPropertyNestedInput
    payments?: PaymentUpdateManyWithoutPropertyNestedInput
    energyStats?: EnergyStatUpdateManyWithoutPropertyNestedInput
    alerts?: AlertUpdateManyWithoutPropertyNestedInput
    bills?: BillUpdateManyWithoutPropertyNestedInput
    supportTickets?: SupportTicketUpdateManyWithoutPropertyNestedInput
    aiMessages?: AIMessageUpdateManyWithoutPropertyNestedInput
  }

  export type PropertyUncheckedUpdateWithoutInstallationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    type?: EnumPropertyTypeFieldUpdateOperationsInput | $Enums.PropertyType
    subscriptionStatus?: EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus
    planType?: NullableStringFieldUpdateOperationsInput | string | null
    solarCapacity?: NullableFloatFieldUpdateOperationsInput | number | null
    batteryStorage?: NullableFloatFieldUpdateOperationsInput | number | null
    installationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    surveys?: SurveyUncheckedUpdateManyWithoutPropertyNestedInput
    proposals?: ProposalUncheckedUpdateManyWithoutPropertyNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutPropertyNestedInput
    energyStats?: EnergyStatUncheckedUpdateManyWithoutPropertyNestedInput
    alerts?: AlertUncheckedUpdateManyWithoutPropertyNestedInput
    bills?: BillUncheckedUpdateManyWithoutPropertyNestedInput
    supportTickets?: SupportTicketUncheckedUpdateManyWithoutPropertyNestedInput
    aiMessages?: AIMessageUncheckedUpdateManyWithoutPropertyNestedInput
  }

  export type PropertyCreateWithoutEnergyStatsInput = {
    id?: string
    name: string
    address: string
    type: $Enums.PropertyType
    subscriptionStatus?: $Enums.SubscriptionStatus
    planType?: string | null
    solarCapacity?: number | null
    batteryStorage?: number | null
    installationDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutPropertiesInput
    surveys?: SurveyCreateNestedManyWithoutPropertyInput
    proposals?: ProposalCreateNestedManyWithoutPropertyInput
    payments?: PaymentCreateNestedManyWithoutPropertyInput
    installation?: InstallationProgressCreateNestedOneWithoutPropertyInput
    alerts?: AlertCreateNestedManyWithoutPropertyInput
    bills?: BillCreateNestedManyWithoutPropertyInput
    supportTickets?: SupportTicketCreateNestedManyWithoutPropertyInput
    aiMessages?: AIMessageCreateNestedManyWithoutPropertyInput
  }

  export type PropertyUncheckedCreateWithoutEnergyStatsInput = {
    id?: string
    userId: string
    name: string
    address: string
    type: $Enums.PropertyType
    subscriptionStatus?: $Enums.SubscriptionStatus
    planType?: string | null
    solarCapacity?: number | null
    batteryStorage?: number | null
    installationDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    surveys?: SurveyUncheckedCreateNestedManyWithoutPropertyInput
    proposals?: ProposalUncheckedCreateNestedManyWithoutPropertyInput
    payments?: PaymentUncheckedCreateNestedManyWithoutPropertyInput
    installation?: InstallationProgressUncheckedCreateNestedOneWithoutPropertyInput
    alerts?: AlertUncheckedCreateNestedManyWithoutPropertyInput
    bills?: BillUncheckedCreateNestedManyWithoutPropertyInput
    supportTickets?: SupportTicketUncheckedCreateNestedManyWithoutPropertyInput
    aiMessages?: AIMessageUncheckedCreateNestedManyWithoutPropertyInput
  }

  export type PropertyCreateOrConnectWithoutEnergyStatsInput = {
    where: PropertyWhereUniqueInput
    create: XOR<PropertyCreateWithoutEnergyStatsInput, PropertyUncheckedCreateWithoutEnergyStatsInput>
  }

  export type PropertyUpsertWithoutEnergyStatsInput = {
    update: XOR<PropertyUpdateWithoutEnergyStatsInput, PropertyUncheckedUpdateWithoutEnergyStatsInput>
    create: XOR<PropertyCreateWithoutEnergyStatsInput, PropertyUncheckedCreateWithoutEnergyStatsInput>
    where?: PropertyWhereInput
  }

  export type PropertyUpdateToOneWithWhereWithoutEnergyStatsInput = {
    where?: PropertyWhereInput
    data: XOR<PropertyUpdateWithoutEnergyStatsInput, PropertyUncheckedUpdateWithoutEnergyStatsInput>
  }

  export type PropertyUpdateWithoutEnergyStatsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    type?: EnumPropertyTypeFieldUpdateOperationsInput | $Enums.PropertyType
    subscriptionStatus?: EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus
    planType?: NullableStringFieldUpdateOperationsInput | string | null
    solarCapacity?: NullableFloatFieldUpdateOperationsInput | number | null
    batteryStorage?: NullableFloatFieldUpdateOperationsInput | number | null
    installationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPropertiesNestedInput
    surveys?: SurveyUpdateManyWithoutPropertyNestedInput
    proposals?: ProposalUpdateManyWithoutPropertyNestedInput
    payments?: PaymentUpdateManyWithoutPropertyNestedInput
    installation?: InstallationProgressUpdateOneWithoutPropertyNestedInput
    alerts?: AlertUpdateManyWithoutPropertyNestedInput
    bills?: BillUpdateManyWithoutPropertyNestedInput
    supportTickets?: SupportTicketUpdateManyWithoutPropertyNestedInput
    aiMessages?: AIMessageUpdateManyWithoutPropertyNestedInput
  }

  export type PropertyUncheckedUpdateWithoutEnergyStatsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    type?: EnumPropertyTypeFieldUpdateOperationsInput | $Enums.PropertyType
    subscriptionStatus?: EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus
    planType?: NullableStringFieldUpdateOperationsInput | string | null
    solarCapacity?: NullableFloatFieldUpdateOperationsInput | number | null
    batteryStorage?: NullableFloatFieldUpdateOperationsInput | number | null
    installationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    surveys?: SurveyUncheckedUpdateManyWithoutPropertyNestedInput
    proposals?: ProposalUncheckedUpdateManyWithoutPropertyNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutPropertyNestedInput
    installation?: InstallationProgressUncheckedUpdateOneWithoutPropertyNestedInput
    alerts?: AlertUncheckedUpdateManyWithoutPropertyNestedInput
    bills?: BillUncheckedUpdateManyWithoutPropertyNestedInput
    supportTickets?: SupportTicketUncheckedUpdateManyWithoutPropertyNestedInput
    aiMessages?: AIMessageUncheckedUpdateManyWithoutPropertyNestedInput
  }

  export type UserCreateWithoutNotificationsInput = {
    id?: string
    email: string
    password: string
    name: string
    phone?: string | null
    address?: string | null
    role?: $Enums.Role
    isActive?: boolean
    currentPropertyId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    refreshTokens?: RefreshTokenCreateNestedManyWithoutUserInput
    properties?: PropertyCreateNestedManyWithoutUserInput
    supportTickets?: SupportTicketCreateNestedManyWithoutUserInput
    aiMessages?: AIMessageCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutNotificationsInput = {
    id?: string
    email: string
    password: string
    name: string
    phone?: string | null
    address?: string | null
    role?: $Enums.Role
    isActive?: boolean
    currentPropertyId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput
    properties?: PropertyUncheckedCreateNestedManyWithoutUserInput
    supportTickets?: SupportTicketUncheckedCreateNestedManyWithoutUserInput
    aiMessages?: AIMessageUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutNotificationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
  }

  export type UserUpsertWithoutNotificationsInput = {
    update: XOR<UserUpdateWithoutNotificationsInput, UserUncheckedUpdateWithoutNotificationsInput>
    create: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutNotificationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutNotificationsInput, UserUncheckedUpdateWithoutNotificationsInput>
  }

  export type UserUpdateWithoutNotificationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    currentPropertyId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    refreshTokens?: RefreshTokenUpdateManyWithoutUserNestedInput
    properties?: PropertyUpdateManyWithoutUserNestedInput
    supportTickets?: SupportTicketUpdateManyWithoutUserNestedInput
    aiMessages?: AIMessageUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutNotificationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    currentPropertyId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
    properties?: PropertyUncheckedUpdateManyWithoutUserNestedInput
    supportTickets?: SupportTicketUncheckedUpdateManyWithoutUserNestedInput
    aiMessages?: AIMessageUncheckedUpdateManyWithoutUserNestedInput
  }

  export type PropertyCreateWithoutAlertsInput = {
    id?: string
    name: string
    address: string
    type: $Enums.PropertyType
    subscriptionStatus?: $Enums.SubscriptionStatus
    planType?: string | null
    solarCapacity?: number | null
    batteryStorage?: number | null
    installationDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutPropertiesInput
    surveys?: SurveyCreateNestedManyWithoutPropertyInput
    proposals?: ProposalCreateNestedManyWithoutPropertyInput
    payments?: PaymentCreateNestedManyWithoutPropertyInput
    installation?: InstallationProgressCreateNestedOneWithoutPropertyInput
    energyStats?: EnergyStatCreateNestedManyWithoutPropertyInput
    bills?: BillCreateNestedManyWithoutPropertyInput
    supportTickets?: SupportTicketCreateNestedManyWithoutPropertyInput
    aiMessages?: AIMessageCreateNestedManyWithoutPropertyInput
  }

  export type PropertyUncheckedCreateWithoutAlertsInput = {
    id?: string
    userId: string
    name: string
    address: string
    type: $Enums.PropertyType
    subscriptionStatus?: $Enums.SubscriptionStatus
    planType?: string | null
    solarCapacity?: number | null
    batteryStorage?: number | null
    installationDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    surveys?: SurveyUncheckedCreateNestedManyWithoutPropertyInput
    proposals?: ProposalUncheckedCreateNestedManyWithoutPropertyInput
    payments?: PaymentUncheckedCreateNestedManyWithoutPropertyInput
    installation?: InstallationProgressUncheckedCreateNestedOneWithoutPropertyInput
    energyStats?: EnergyStatUncheckedCreateNestedManyWithoutPropertyInput
    bills?: BillUncheckedCreateNestedManyWithoutPropertyInput
    supportTickets?: SupportTicketUncheckedCreateNestedManyWithoutPropertyInput
    aiMessages?: AIMessageUncheckedCreateNestedManyWithoutPropertyInput
  }

  export type PropertyCreateOrConnectWithoutAlertsInput = {
    where: PropertyWhereUniqueInput
    create: XOR<PropertyCreateWithoutAlertsInput, PropertyUncheckedCreateWithoutAlertsInput>
  }

  export type PropertyUpsertWithoutAlertsInput = {
    update: XOR<PropertyUpdateWithoutAlertsInput, PropertyUncheckedUpdateWithoutAlertsInput>
    create: XOR<PropertyCreateWithoutAlertsInput, PropertyUncheckedCreateWithoutAlertsInput>
    where?: PropertyWhereInput
  }

  export type PropertyUpdateToOneWithWhereWithoutAlertsInput = {
    where?: PropertyWhereInput
    data: XOR<PropertyUpdateWithoutAlertsInput, PropertyUncheckedUpdateWithoutAlertsInput>
  }

  export type PropertyUpdateWithoutAlertsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    type?: EnumPropertyTypeFieldUpdateOperationsInput | $Enums.PropertyType
    subscriptionStatus?: EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus
    planType?: NullableStringFieldUpdateOperationsInput | string | null
    solarCapacity?: NullableFloatFieldUpdateOperationsInput | number | null
    batteryStorage?: NullableFloatFieldUpdateOperationsInput | number | null
    installationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPropertiesNestedInput
    surveys?: SurveyUpdateManyWithoutPropertyNestedInput
    proposals?: ProposalUpdateManyWithoutPropertyNestedInput
    payments?: PaymentUpdateManyWithoutPropertyNestedInput
    installation?: InstallationProgressUpdateOneWithoutPropertyNestedInput
    energyStats?: EnergyStatUpdateManyWithoutPropertyNestedInput
    bills?: BillUpdateManyWithoutPropertyNestedInput
    supportTickets?: SupportTicketUpdateManyWithoutPropertyNestedInput
    aiMessages?: AIMessageUpdateManyWithoutPropertyNestedInput
  }

  export type PropertyUncheckedUpdateWithoutAlertsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    type?: EnumPropertyTypeFieldUpdateOperationsInput | $Enums.PropertyType
    subscriptionStatus?: EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus
    planType?: NullableStringFieldUpdateOperationsInput | string | null
    solarCapacity?: NullableFloatFieldUpdateOperationsInput | number | null
    batteryStorage?: NullableFloatFieldUpdateOperationsInput | number | null
    installationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    surveys?: SurveyUncheckedUpdateManyWithoutPropertyNestedInput
    proposals?: ProposalUncheckedUpdateManyWithoutPropertyNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutPropertyNestedInput
    installation?: InstallationProgressUncheckedUpdateOneWithoutPropertyNestedInput
    energyStats?: EnergyStatUncheckedUpdateManyWithoutPropertyNestedInput
    bills?: BillUncheckedUpdateManyWithoutPropertyNestedInput
    supportTickets?: SupportTicketUncheckedUpdateManyWithoutPropertyNestedInput
    aiMessages?: AIMessageUncheckedUpdateManyWithoutPropertyNestedInput
  }

  export type PropertyCreateWithoutBillsInput = {
    id?: string
    name: string
    address: string
    type: $Enums.PropertyType
    subscriptionStatus?: $Enums.SubscriptionStatus
    planType?: string | null
    solarCapacity?: number | null
    batteryStorage?: number | null
    installationDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutPropertiesInput
    surveys?: SurveyCreateNestedManyWithoutPropertyInput
    proposals?: ProposalCreateNestedManyWithoutPropertyInput
    payments?: PaymentCreateNestedManyWithoutPropertyInput
    installation?: InstallationProgressCreateNestedOneWithoutPropertyInput
    energyStats?: EnergyStatCreateNestedManyWithoutPropertyInput
    alerts?: AlertCreateNestedManyWithoutPropertyInput
    supportTickets?: SupportTicketCreateNestedManyWithoutPropertyInput
    aiMessages?: AIMessageCreateNestedManyWithoutPropertyInput
  }

  export type PropertyUncheckedCreateWithoutBillsInput = {
    id?: string
    userId: string
    name: string
    address: string
    type: $Enums.PropertyType
    subscriptionStatus?: $Enums.SubscriptionStatus
    planType?: string | null
    solarCapacity?: number | null
    batteryStorage?: number | null
    installationDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    surveys?: SurveyUncheckedCreateNestedManyWithoutPropertyInput
    proposals?: ProposalUncheckedCreateNestedManyWithoutPropertyInput
    payments?: PaymentUncheckedCreateNestedManyWithoutPropertyInput
    installation?: InstallationProgressUncheckedCreateNestedOneWithoutPropertyInput
    energyStats?: EnergyStatUncheckedCreateNestedManyWithoutPropertyInput
    alerts?: AlertUncheckedCreateNestedManyWithoutPropertyInput
    supportTickets?: SupportTicketUncheckedCreateNestedManyWithoutPropertyInput
    aiMessages?: AIMessageUncheckedCreateNestedManyWithoutPropertyInput
  }

  export type PropertyCreateOrConnectWithoutBillsInput = {
    where: PropertyWhereUniqueInput
    create: XOR<PropertyCreateWithoutBillsInput, PropertyUncheckedCreateWithoutBillsInput>
  }

  export type PropertyUpsertWithoutBillsInput = {
    update: XOR<PropertyUpdateWithoutBillsInput, PropertyUncheckedUpdateWithoutBillsInput>
    create: XOR<PropertyCreateWithoutBillsInput, PropertyUncheckedCreateWithoutBillsInput>
    where?: PropertyWhereInput
  }

  export type PropertyUpdateToOneWithWhereWithoutBillsInput = {
    where?: PropertyWhereInput
    data: XOR<PropertyUpdateWithoutBillsInput, PropertyUncheckedUpdateWithoutBillsInput>
  }

  export type PropertyUpdateWithoutBillsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    type?: EnumPropertyTypeFieldUpdateOperationsInput | $Enums.PropertyType
    subscriptionStatus?: EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus
    planType?: NullableStringFieldUpdateOperationsInput | string | null
    solarCapacity?: NullableFloatFieldUpdateOperationsInput | number | null
    batteryStorage?: NullableFloatFieldUpdateOperationsInput | number | null
    installationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPropertiesNestedInput
    surveys?: SurveyUpdateManyWithoutPropertyNestedInput
    proposals?: ProposalUpdateManyWithoutPropertyNestedInput
    payments?: PaymentUpdateManyWithoutPropertyNestedInput
    installation?: InstallationProgressUpdateOneWithoutPropertyNestedInput
    energyStats?: EnergyStatUpdateManyWithoutPropertyNestedInput
    alerts?: AlertUpdateManyWithoutPropertyNestedInput
    supportTickets?: SupportTicketUpdateManyWithoutPropertyNestedInput
    aiMessages?: AIMessageUpdateManyWithoutPropertyNestedInput
  }

  export type PropertyUncheckedUpdateWithoutBillsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    type?: EnumPropertyTypeFieldUpdateOperationsInput | $Enums.PropertyType
    subscriptionStatus?: EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus
    planType?: NullableStringFieldUpdateOperationsInput | string | null
    solarCapacity?: NullableFloatFieldUpdateOperationsInput | number | null
    batteryStorage?: NullableFloatFieldUpdateOperationsInput | number | null
    installationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    surveys?: SurveyUncheckedUpdateManyWithoutPropertyNestedInput
    proposals?: ProposalUncheckedUpdateManyWithoutPropertyNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutPropertyNestedInput
    installation?: InstallationProgressUncheckedUpdateOneWithoutPropertyNestedInput
    energyStats?: EnergyStatUncheckedUpdateManyWithoutPropertyNestedInput
    alerts?: AlertUncheckedUpdateManyWithoutPropertyNestedInput
    supportTickets?: SupportTicketUncheckedUpdateManyWithoutPropertyNestedInput
    aiMessages?: AIMessageUncheckedUpdateManyWithoutPropertyNestedInput
  }

  export type UserCreateWithoutSupportTicketsInput = {
    id?: string
    email: string
    password: string
    name: string
    phone?: string | null
    address?: string | null
    role?: $Enums.Role
    isActive?: boolean
    currentPropertyId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    refreshTokens?: RefreshTokenCreateNestedManyWithoutUserInput
    properties?: PropertyCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    aiMessages?: AIMessageCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSupportTicketsInput = {
    id?: string
    email: string
    password: string
    name: string
    phone?: string | null
    address?: string | null
    role?: $Enums.Role
    isActive?: boolean
    currentPropertyId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput
    properties?: PropertyUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    aiMessages?: AIMessageUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSupportTicketsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSupportTicketsInput, UserUncheckedCreateWithoutSupportTicketsInput>
  }

  export type PropertyCreateWithoutSupportTicketsInput = {
    id?: string
    name: string
    address: string
    type: $Enums.PropertyType
    subscriptionStatus?: $Enums.SubscriptionStatus
    planType?: string | null
    solarCapacity?: number | null
    batteryStorage?: number | null
    installationDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutPropertiesInput
    surveys?: SurveyCreateNestedManyWithoutPropertyInput
    proposals?: ProposalCreateNestedManyWithoutPropertyInput
    payments?: PaymentCreateNestedManyWithoutPropertyInput
    installation?: InstallationProgressCreateNestedOneWithoutPropertyInput
    energyStats?: EnergyStatCreateNestedManyWithoutPropertyInput
    alerts?: AlertCreateNestedManyWithoutPropertyInput
    bills?: BillCreateNestedManyWithoutPropertyInput
    aiMessages?: AIMessageCreateNestedManyWithoutPropertyInput
  }

  export type PropertyUncheckedCreateWithoutSupportTicketsInput = {
    id?: string
    userId: string
    name: string
    address: string
    type: $Enums.PropertyType
    subscriptionStatus?: $Enums.SubscriptionStatus
    planType?: string | null
    solarCapacity?: number | null
    batteryStorage?: number | null
    installationDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    surveys?: SurveyUncheckedCreateNestedManyWithoutPropertyInput
    proposals?: ProposalUncheckedCreateNestedManyWithoutPropertyInput
    payments?: PaymentUncheckedCreateNestedManyWithoutPropertyInput
    installation?: InstallationProgressUncheckedCreateNestedOneWithoutPropertyInput
    energyStats?: EnergyStatUncheckedCreateNestedManyWithoutPropertyInput
    alerts?: AlertUncheckedCreateNestedManyWithoutPropertyInput
    bills?: BillUncheckedCreateNestedManyWithoutPropertyInput
    aiMessages?: AIMessageUncheckedCreateNestedManyWithoutPropertyInput
  }

  export type PropertyCreateOrConnectWithoutSupportTicketsInput = {
    where: PropertyWhereUniqueInput
    create: XOR<PropertyCreateWithoutSupportTicketsInput, PropertyUncheckedCreateWithoutSupportTicketsInput>
  }

  export type UserUpsertWithoutSupportTicketsInput = {
    update: XOR<UserUpdateWithoutSupportTicketsInput, UserUncheckedUpdateWithoutSupportTicketsInput>
    create: XOR<UserCreateWithoutSupportTicketsInput, UserUncheckedCreateWithoutSupportTicketsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSupportTicketsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSupportTicketsInput, UserUncheckedUpdateWithoutSupportTicketsInput>
  }

  export type UserUpdateWithoutSupportTicketsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    currentPropertyId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    refreshTokens?: RefreshTokenUpdateManyWithoutUserNestedInput
    properties?: PropertyUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    aiMessages?: AIMessageUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSupportTicketsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    currentPropertyId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
    properties?: PropertyUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    aiMessages?: AIMessageUncheckedUpdateManyWithoutUserNestedInput
  }

  export type PropertyUpsertWithoutSupportTicketsInput = {
    update: XOR<PropertyUpdateWithoutSupportTicketsInput, PropertyUncheckedUpdateWithoutSupportTicketsInput>
    create: XOR<PropertyCreateWithoutSupportTicketsInput, PropertyUncheckedCreateWithoutSupportTicketsInput>
    where?: PropertyWhereInput
  }

  export type PropertyUpdateToOneWithWhereWithoutSupportTicketsInput = {
    where?: PropertyWhereInput
    data: XOR<PropertyUpdateWithoutSupportTicketsInput, PropertyUncheckedUpdateWithoutSupportTicketsInput>
  }

  export type PropertyUpdateWithoutSupportTicketsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    type?: EnumPropertyTypeFieldUpdateOperationsInput | $Enums.PropertyType
    subscriptionStatus?: EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus
    planType?: NullableStringFieldUpdateOperationsInput | string | null
    solarCapacity?: NullableFloatFieldUpdateOperationsInput | number | null
    batteryStorage?: NullableFloatFieldUpdateOperationsInput | number | null
    installationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPropertiesNestedInput
    surveys?: SurveyUpdateManyWithoutPropertyNestedInput
    proposals?: ProposalUpdateManyWithoutPropertyNestedInput
    payments?: PaymentUpdateManyWithoutPropertyNestedInput
    installation?: InstallationProgressUpdateOneWithoutPropertyNestedInput
    energyStats?: EnergyStatUpdateManyWithoutPropertyNestedInput
    alerts?: AlertUpdateManyWithoutPropertyNestedInput
    bills?: BillUpdateManyWithoutPropertyNestedInput
    aiMessages?: AIMessageUpdateManyWithoutPropertyNestedInput
  }

  export type PropertyUncheckedUpdateWithoutSupportTicketsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    type?: EnumPropertyTypeFieldUpdateOperationsInput | $Enums.PropertyType
    subscriptionStatus?: EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus
    planType?: NullableStringFieldUpdateOperationsInput | string | null
    solarCapacity?: NullableFloatFieldUpdateOperationsInput | number | null
    batteryStorage?: NullableFloatFieldUpdateOperationsInput | number | null
    installationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    surveys?: SurveyUncheckedUpdateManyWithoutPropertyNestedInput
    proposals?: ProposalUncheckedUpdateManyWithoutPropertyNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutPropertyNestedInput
    installation?: InstallationProgressUncheckedUpdateOneWithoutPropertyNestedInput
    energyStats?: EnergyStatUncheckedUpdateManyWithoutPropertyNestedInput
    alerts?: AlertUncheckedUpdateManyWithoutPropertyNestedInput
    bills?: BillUncheckedUpdateManyWithoutPropertyNestedInput
    aiMessages?: AIMessageUncheckedUpdateManyWithoutPropertyNestedInput
  }

  export type UserCreateWithoutAiMessagesInput = {
    id?: string
    email: string
    password: string
    name: string
    phone?: string | null
    address?: string | null
    role?: $Enums.Role
    isActive?: boolean
    currentPropertyId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    refreshTokens?: RefreshTokenCreateNestedManyWithoutUserInput
    properties?: PropertyCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    supportTickets?: SupportTicketCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAiMessagesInput = {
    id?: string
    email: string
    password: string
    name: string
    phone?: string | null
    address?: string | null
    role?: $Enums.Role
    isActive?: boolean
    currentPropertyId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput
    properties?: PropertyUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    supportTickets?: SupportTicketUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAiMessagesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAiMessagesInput, UserUncheckedCreateWithoutAiMessagesInput>
  }

  export type PropertyCreateWithoutAiMessagesInput = {
    id?: string
    name: string
    address: string
    type: $Enums.PropertyType
    subscriptionStatus?: $Enums.SubscriptionStatus
    planType?: string | null
    solarCapacity?: number | null
    batteryStorage?: number | null
    installationDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutPropertiesInput
    surveys?: SurveyCreateNestedManyWithoutPropertyInput
    proposals?: ProposalCreateNestedManyWithoutPropertyInput
    payments?: PaymentCreateNestedManyWithoutPropertyInput
    installation?: InstallationProgressCreateNestedOneWithoutPropertyInput
    energyStats?: EnergyStatCreateNestedManyWithoutPropertyInput
    alerts?: AlertCreateNestedManyWithoutPropertyInput
    bills?: BillCreateNestedManyWithoutPropertyInput
    supportTickets?: SupportTicketCreateNestedManyWithoutPropertyInput
  }

  export type PropertyUncheckedCreateWithoutAiMessagesInput = {
    id?: string
    userId: string
    name: string
    address: string
    type: $Enums.PropertyType
    subscriptionStatus?: $Enums.SubscriptionStatus
    planType?: string | null
    solarCapacity?: number | null
    batteryStorage?: number | null
    installationDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    surveys?: SurveyUncheckedCreateNestedManyWithoutPropertyInput
    proposals?: ProposalUncheckedCreateNestedManyWithoutPropertyInput
    payments?: PaymentUncheckedCreateNestedManyWithoutPropertyInput
    installation?: InstallationProgressUncheckedCreateNestedOneWithoutPropertyInput
    energyStats?: EnergyStatUncheckedCreateNestedManyWithoutPropertyInput
    alerts?: AlertUncheckedCreateNestedManyWithoutPropertyInput
    bills?: BillUncheckedCreateNestedManyWithoutPropertyInput
    supportTickets?: SupportTicketUncheckedCreateNestedManyWithoutPropertyInput
  }

  export type PropertyCreateOrConnectWithoutAiMessagesInput = {
    where: PropertyWhereUniqueInput
    create: XOR<PropertyCreateWithoutAiMessagesInput, PropertyUncheckedCreateWithoutAiMessagesInput>
  }

  export type UserUpsertWithoutAiMessagesInput = {
    update: XOR<UserUpdateWithoutAiMessagesInput, UserUncheckedUpdateWithoutAiMessagesInput>
    create: XOR<UserCreateWithoutAiMessagesInput, UserUncheckedCreateWithoutAiMessagesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAiMessagesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAiMessagesInput, UserUncheckedUpdateWithoutAiMessagesInput>
  }

  export type UserUpdateWithoutAiMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    currentPropertyId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    refreshTokens?: RefreshTokenUpdateManyWithoutUserNestedInput
    properties?: PropertyUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    supportTickets?: SupportTicketUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAiMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    currentPropertyId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
    properties?: PropertyUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    supportTickets?: SupportTicketUncheckedUpdateManyWithoutUserNestedInput
  }

  export type PropertyUpsertWithoutAiMessagesInput = {
    update: XOR<PropertyUpdateWithoutAiMessagesInput, PropertyUncheckedUpdateWithoutAiMessagesInput>
    create: XOR<PropertyCreateWithoutAiMessagesInput, PropertyUncheckedCreateWithoutAiMessagesInput>
    where?: PropertyWhereInput
  }

  export type PropertyUpdateToOneWithWhereWithoutAiMessagesInput = {
    where?: PropertyWhereInput
    data: XOR<PropertyUpdateWithoutAiMessagesInput, PropertyUncheckedUpdateWithoutAiMessagesInput>
  }

  export type PropertyUpdateWithoutAiMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    type?: EnumPropertyTypeFieldUpdateOperationsInput | $Enums.PropertyType
    subscriptionStatus?: EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus
    planType?: NullableStringFieldUpdateOperationsInput | string | null
    solarCapacity?: NullableFloatFieldUpdateOperationsInput | number | null
    batteryStorage?: NullableFloatFieldUpdateOperationsInput | number | null
    installationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPropertiesNestedInput
    surveys?: SurveyUpdateManyWithoutPropertyNestedInput
    proposals?: ProposalUpdateManyWithoutPropertyNestedInput
    payments?: PaymentUpdateManyWithoutPropertyNestedInput
    installation?: InstallationProgressUpdateOneWithoutPropertyNestedInput
    energyStats?: EnergyStatUpdateManyWithoutPropertyNestedInput
    alerts?: AlertUpdateManyWithoutPropertyNestedInput
    bills?: BillUpdateManyWithoutPropertyNestedInput
    supportTickets?: SupportTicketUpdateManyWithoutPropertyNestedInput
  }

  export type PropertyUncheckedUpdateWithoutAiMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    type?: EnumPropertyTypeFieldUpdateOperationsInput | $Enums.PropertyType
    subscriptionStatus?: EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus
    planType?: NullableStringFieldUpdateOperationsInput | string | null
    solarCapacity?: NullableFloatFieldUpdateOperationsInput | number | null
    batteryStorage?: NullableFloatFieldUpdateOperationsInput | number | null
    installationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    surveys?: SurveyUncheckedUpdateManyWithoutPropertyNestedInput
    proposals?: ProposalUncheckedUpdateManyWithoutPropertyNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutPropertyNestedInput
    installation?: InstallationProgressUncheckedUpdateOneWithoutPropertyNestedInput
    energyStats?: EnergyStatUncheckedUpdateManyWithoutPropertyNestedInput
    alerts?: AlertUncheckedUpdateManyWithoutPropertyNestedInput
    bills?: BillUncheckedUpdateManyWithoutPropertyNestedInput
    supportTickets?: SupportTicketUncheckedUpdateManyWithoutPropertyNestedInput
  }

  export type RefreshTokenCreateManyUserInput = {
    id?: string
    token: string
    expiresAt: Date | string
    createdAt?: Date | string
    isRevoked?: boolean
  }

  export type PropertyCreateManyUserInput = {
    id?: string
    name: string
    address: string
    type: $Enums.PropertyType
    subscriptionStatus?: $Enums.SubscriptionStatus
    planType?: string | null
    solarCapacity?: number | null
    batteryStorage?: number | null
    installationDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NotificationCreateManyUserInput = {
    id?: string
    type: string
    title: string
    message: string
    route?: string | null
    read?: boolean
    dismissible?: boolean
    persistent?: boolean
    createdAt?: Date | string
  }

  export type SupportTicketCreateManyUserInput = {
    id?: string
    propertyId: string
    category: $Enums.TicketCategory
    priority: $Enums.TicketPriority
    status?: $Enums.TicketStatus
    title: string
    description: string
    estimatedResponse?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AIMessageCreateManyUserInput = {
    id?: string
    propertyId: string
    role: $Enums.ChatRole
    content: string
    createdAt?: Date | string
  }

  export type RefreshTokenUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isRevoked?: BoolFieldUpdateOperationsInput | boolean
  }

  export type RefreshTokenUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isRevoked?: BoolFieldUpdateOperationsInput | boolean
  }

  export type RefreshTokenUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isRevoked?: BoolFieldUpdateOperationsInput | boolean
  }

  export type PropertyUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    type?: EnumPropertyTypeFieldUpdateOperationsInput | $Enums.PropertyType
    subscriptionStatus?: EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus
    planType?: NullableStringFieldUpdateOperationsInput | string | null
    solarCapacity?: NullableFloatFieldUpdateOperationsInput | number | null
    batteryStorage?: NullableFloatFieldUpdateOperationsInput | number | null
    installationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    surveys?: SurveyUpdateManyWithoutPropertyNestedInput
    proposals?: ProposalUpdateManyWithoutPropertyNestedInput
    payments?: PaymentUpdateManyWithoutPropertyNestedInput
    installation?: InstallationProgressUpdateOneWithoutPropertyNestedInput
    energyStats?: EnergyStatUpdateManyWithoutPropertyNestedInput
    alerts?: AlertUpdateManyWithoutPropertyNestedInput
    bills?: BillUpdateManyWithoutPropertyNestedInput
    supportTickets?: SupportTicketUpdateManyWithoutPropertyNestedInput
    aiMessages?: AIMessageUpdateManyWithoutPropertyNestedInput
  }

  export type PropertyUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    type?: EnumPropertyTypeFieldUpdateOperationsInput | $Enums.PropertyType
    subscriptionStatus?: EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus
    planType?: NullableStringFieldUpdateOperationsInput | string | null
    solarCapacity?: NullableFloatFieldUpdateOperationsInput | number | null
    batteryStorage?: NullableFloatFieldUpdateOperationsInput | number | null
    installationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    surveys?: SurveyUncheckedUpdateManyWithoutPropertyNestedInput
    proposals?: ProposalUncheckedUpdateManyWithoutPropertyNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutPropertyNestedInput
    installation?: InstallationProgressUncheckedUpdateOneWithoutPropertyNestedInput
    energyStats?: EnergyStatUncheckedUpdateManyWithoutPropertyNestedInput
    alerts?: AlertUncheckedUpdateManyWithoutPropertyNestedInput
    bills?: BillUncheckedUpdateManyWithoutPropertyNestedInput
    supportTickets?: SupportTicketUncheckedUpdateManyWithoutPropertyNestedInput
    aiMessages?: AIMessageUncheckedUpdateManyWithoutPropertyNestedInput
  }

  export type PropertyUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    type?: EnumPropertyTypeFieldUpdateOperationsInput | $Enums.PropertyType
    subscriptionStatus?: EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus
    planType?: NullableStringFieldUpdateOperationsInput | string | null
    solarCapacity?: NullableFloatFieldUpdateOperationsInput | number | null
    batteryStorage?: NullableFloatFieldUpdateOperationsInput | number | null
    installationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    route?: NullableStringFieldUpdateOperationsInput | string | null
    read?: BoolFieldUpdateOperationsInput | boolean
    dismissible?: BoolFieldUpdateOperationsInput | boolean
    persistent?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    route?: NullableStringFieldUpdateOperationsInput | string | null
    read?: BoolFieldUpdateOperationsInput | boolean
    dismissible?: BoolFieldUpdateOperationsInput | boolean
    persistent?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    route?: NullableStringFieldUpdateOperationsInput | string | null
    read?: BoolFieldUpdateOperationsInput | boolean
    dismissible?: BoolFieldUpdateOperationsInput | boolean
    persistent?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SupportTicketUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    category?: EnumTicketCategoryFieldUpdateOperationsInput | $Enums.TicketCategory
    priority?: EnumTicketPriorityFieldUpdateOperationsInput | $Enums.TicketPriority
    status?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    estimatedResponse?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    property?: PropertyUpdateOneRequiredWithoutSupportTicketsNestedInput
  }

  export type SupportTicketUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    category?: EnumTicketCategoryFieldUpdateOperationsInput | $Enums.TicketCategory
    priority?: EnumTicketPriorityFieldUpdateOperationsInput | $Enums.TicketPriority
    status?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    estimatedResponse?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SupportTicketUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    category?: EnumTicketCategoryFieldUpdateOperationsInput | $Enums.TicketCategory
    priority?: EnumTicketPriorityFieldUpdateOperationsInput | $Enums.TicketPriority
    status?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    estimatedResponse?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIMessageUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumChatRoleFieldUpdateOperationsInput | $Enums.ChatRole
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    property?: PropertyUpdateOneRequiredWithoutAiMessagesNestedInput
  }

  export type AIMessageUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    role?: EnumChatRoleFieldUpdateOperationsInput | $Enums.ChatRole
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIMessageUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    propertyId?: StringFieldUpdateOperationsInput | string
    role?: EnumChatRoleFieldUpdateOperationsInput | $Enums.ChatRole
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SurveyCreateManyPropertyInput = {
    id?: string
    propertyType: $Enums.PropertyType
    roofArea: number
    monthlyBill: number
    monthlyConsumption: number
    peakHours: string
    occupants: number
    appliances?: SurveyCreateappliancesInput | string[]
    status?: string
    submittedAt?: Date | string
  }

  export type ProposalCreateManyPropertyInput = {
    id?: string
    surveyId: string
    solarCapacity: number
    batteryStorage: number
    monthlyFee: number
    estimatedSavings: number
    estimatedProduction: number
    contractDuration: number
    installationFee: number
    securityDeposit: number
    whatsIncluded?: ProposalCreatewhatsIncludedInput | string[]
    generatedAt?: Date | string
    expiresAt: Date | string
  }

  export type PaymentCreateManyPropertyInput = {
    id?: string
    proposalId?: string | null
    orderId: string
    transactionId?: string | null
    paymentMethod: $Enums.PaymentMethod
    amount: number
    currency?: string
    status?: $Enums.PaymentStatus
    signature?: string | null
    description?: string | null
    paymentGatewayUrl?: string | null
    paidAt?: Date | string | null
    createdAt?: Date | string
  }

  export type EnergyStatCreateManyPropertyInput = {
    id?: string
    date?: Date | string
    period: string
    production: number
    consumption: number
    gridUsage: number
    batteryPercent?: number | null
    solarKw?: number | null
    gridKw?: number | null
    exporting?: boolean | null
  }

  export type AlertCreateManyPropertyInput = {
    id?: string
    category: $Enums.AlertCategory
    severity: $Enums.AlertSeverity
    title: string
    message: string
    read?: boolean
    createdAt?: Date | string
  }

  export type BillCreateManyPropertyInput = {
    id?: string
    month: string
    totalAmount: number
    subscriptionFee: number
    usageCharge: number
    taxes: number
    status?: $Enums.BillStatus
    dueDate: Date | string
    generatedAt?: Date | string
    paidDate?: Date | string | null
    pdfUrl?: string | null
  }

  export type SupportTicketCreateManyPropertyInput = {
    id?: string
    userId: string
    category: $Enums.TicketCategory
    priority: $Enums.TicketPriority
    status?: $Enums.TicketStatus
    title: string
    description: string
    estimatedResponse?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AIMessageCreateManyPropertyInput = {
    id?: string
    userId: string
    role: $Enums.ChatRole
    content: string
    createdAt?: Date | string
  }

  export type SurveyUpdateWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    propertyType?: EnumPropertyTypeFieldUpdateOperationsInput | $Enums.PropertyType
    roofArea?: FloatFieldUpdateOperationsInput | number
    monthlyBill?: FloatFieldUpdateOperationsInput | number
    monthlyConsumption?: FloatFieldUpdateOperationsInput | number
    peakHours?: StringFieldUpdateOperationsInput | string
    occupants?: IntFieldUpdateOperationsInput | number
    appliances?: SurveyUpdateappliancesInput | string[]
    status?: StringFieldUpdateOperationsInput | string
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SurveyUncheckedUpdateWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    propertyType?: EnumPropertyTypeFieldUpdateOperationsInput | $Enums.PropertyType
    roofArea?: FloatFieldUpdateOperationsInput | number
    monthlyBill?: FloatFieldUpdateOperationsInput | number
    monthlyConsumption?: FloatFieldUpdateOperationsInput | number
    peakHours?: StringFieldUpdateOperationsInput | string
    occupants?: IntFieldUpdateOperationsInput | number
    appliances?: SurveyUpdateappliancesInput | string[]
    status?: StringFieldUpdateOperationsInput | string
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SurveyUncheckedUpdateManyWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    propertyType?: EnumPropertyTypeFieldUpdateOperationsInput | $Enums.PropertyType
    roofArea?: FloatFieldUpdateOperationsInput | number
    monthlyBill?: FloatFieldUpdateOperationsInput | number
    monthlyConsumption?: FloatFieldUpdateOperationsInput | number
    peakHours?: StringFieldUpdateOperationsInput | string
    occupants?: IntFieldUpdateOperationsInput | number
    appliances?: SurveyUpdateappliancesInput | string[]
    status?: StringFieldUpdateOperationsInput | string
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProposalUpdateWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    surveyId?: StringFieldUpdateOperationsInput | string
    solarCapacity?: FloatFieldUpdateOperationsInput | number
    batteryStorage?: FloatFieldUpdateOperationsInput | number
    monthlyFee?: FloatFieldUpdateOperationsInput | number
    estimatedSavings?: FloatFieldUpdateOperationsInput | number
    estimatedProduction?: FloatFieldUpdateOperationsInput | number
    contractDuration?: IntFieldUpdateOperationsInput | number
    installationFee?: FloatFieldUpdateOperationsInput | number
    securityDeposit?: FloatFieldUpdateOperationsInput | number
    whatsIncluded?: ProposalUpdatewhatsIncludedInput | string[]
    generatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProposalUncheckedUpdateWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    surveyId?: StringFieldUpdateOperationsInput | string
    solarCapacity?: FloatFieldUpdateOperationsInput | number
    batteryStorage?: FloatFieldUpdateOperationsInput | number
    monthlyFee?: FloatFieldUpdateOperationsInput | number
    estimatedSavings?: FloatFieldUpdateOperationsInput | number
    estimatedProduction?: FloatFieldUpdateOperationsInput | number
    contractDuration?: IntFieldUpdateOperationsInput | number
    installationFee?: FloatFieldUpdateOperationsInput | number
    securityDeposit?: FloatFieldUpdateOperationsInput | number
    whatsIncluded?: ProposalUpdatewhatsIncludedInput | string[]
    generatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProposalUncheckedUpdateManyWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    surveyId?: StringFieldUpdateOperationsInput | string
    solarCapacity?: FloatFieldUpdateOperationsInput | number
    batteryStorage?: FloatFieldUpdateOperationsInput | number
    monthlyFee?: FloatFieldUpdateOperationsInput | number
    estimatedSavings?: FloatFieldUpdateOperationsInput | number
    estimatedProduction?: FloatFieldUpdateOperationsInput | number
    contractDuration?: IntFieldUpdateOperationsInput | number
    installationFee?: FloatFieldUpdateOperationsInput | number
    securityDeposit?: FloatFieldUpdateOperationsInput | number
    whatsIncluded?: ProposalUpdatewhatsIncludedInput | string[]
    generatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentUpdateWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    proposalId?: NullableStringFieldUpdateOperationsInput | string | null
    orderId?: StringFieldUpdateOperationsInput | string
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    amount?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    signature?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    paymentGatewayUrl?: NullableStringFieldUpdateOperationsInput | string | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentUncheckedUpdateWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    proposalId?: NullableStringFieldUpdateOperationsInput | string | null
    orderId?: StringFieldUpdateOperationsInput | string
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    amount?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    signature?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    paymentGatewayUrl?: NullableStringFieldUpdateOperationsInput | string | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentUncheckedUpdateManyWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    proposalId?: NullableStringFieldUpdateOperationsInput | string | null
    orderId?: StringFieldUpdateOperationsInput | string
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod
    amount?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    signature?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    paymentGatewayUrl?: NullableStringFieldUpdateOperationsInput | string | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EnergyStatUpdateWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    period?: StringFieldUpdateOperationsInput | string
    production?: FloatFieldUpdateOperationsInput | number
    consumption?: FloatFieldUpdateOperationsInput | number
    gridUsage?: FloatFieldUpdateOperationsInput | number
    batteryPercent?: NullableFloatFieldUpdateOperationsInput | number | null
    solarKw?: NullableFloatFieldUpdateOperationsInput | number | null
    gridKw?: NullableFloatFieldUpdateOperationsInput | number | null
    exporting?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type EnergyStatUncheckedUpdateWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    period?: StringFieldUpdateOperationsInput | string
    production?: FloatFieldUpdateOperationsInput | number
    consumption?: FloatFieldUpdateOperationsInput | number
    gridUsage?: FloatFieldUpdateOperationsInput | number
    batteryPercent?: NullableFloatFieldUpdateOperationsInput | number | null
    solarKw?: NullableFloatFieldUpdateOperationsInput | number | null
    gridKw?: NullableFloatFieldUpdateOperationsInput | number | null
    exporting?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type EnergyStatUncheckedUpdateManyWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    period?: StringFieldUpdateOperationsInput | string
    production?: FloatFieldUpdateOperationsInput | number
    consumption?: FloatFieldUpdateOperationsInput | number
    gridUsage?: FloatFieldUpdateOperationsInput | number
    batteryPercent?: NullableFloatFieldUpdateOperationsInput | number | null
    solarKw?: NullableFloatFieldUpdateOperationsInput | number | null
    gridKw?: NullableFloatFieldUpdateOperationsInput | number | null
    exporting?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type AlertUpdateWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    category?: EnumAlertCategoryFieldUpdateOperationsInput | $Enums.AlertCategory
    severity?: EnumAlertSeverityFieldUpdateOperationsInput | $Enums.AlertSeverity
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    read?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AlertUncheckedUpdateWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    category?: EnumAlertCategoryFieldUpdateOperationsInput | $Enums.AlertCategory
    severity?: EnumAlertSeverityFieldUpdateOperationsInput | $Enums.AlertSeverity
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    read?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AlertUncheckedUpdateManyWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    category?: EnumAlertCategoryFieldUpdateOperationsInput | $Enums.AlertCategory
    severity?: EnumAlertSeverityFieldUpdateOperationsInput | $Enums.AlertSeverity
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    read?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BillUpdateWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    month?: StringFieldUpdateOperationsInput | string
    totalAmount?: FloatFieldUpdateOperationsInput | number
    subscriptionFee?: FloatFieldUpdateOperationsInput | number
    usageCharge?: FloatFieldUpdateOperationsInput | number
    taxes?: FloatFieldUpdateOperationsInput | number
    status?: EnumBillStatusFieldUpdateOperationsInput | $Enums.BillStatus
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    generatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    paidDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pdfUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type BillUncheckedUpdateWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    month?: StringFieldUpdateOperationsInput | string
    totalAmount?: FloatFieldUpdateOperationsInput | number
    subscriptionFee?: FloatFieldUpdateOperationsInput | number
    usageCharge?: FloatFieldUpdateOperationsInput | number
    taxes?: FloatFieldUpdateOperationsInput | number
    status?: EnumBillStatusFieldUpdateOperationsInput | $Enums.BillStatus
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    generatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    paidDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pdfUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type BillUncheckedUpdateManyWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    month?: StringFieldUpdateOperationsInput | string
    totalAmount?: FloatFieldUpdateOperationsInput | number
    subscriptionFee?: FloatFieldUpdateOperationsInput | number
    usageCharge?: FloatFieldUpdateOperationsInput | number
    taxes?: FloatFieldUpdateOperationsInput | number
    status?: EnumBillStatusFieldUpdateOperationsInput | $Enums.BillStatus
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    generatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    paidDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pdfUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SupportTicketUpdateWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    category?: EnumTicketCategoryFieldUpdateOperationsInput | $Enums.TicketCategory
    priority?: EnumTicketPriorityFieldUpdateOperationsInput | $Enums.TicketPriority
    status?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    estimatedResponse?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSupportTicketsNestedInput
  }

  export type SupportTicketUncheckedUpdateWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    category?: EnumTicketCategoryFieldUpdateOperationsInput | $Enums.TicketCategory
    priority?: EnumTicketPriorityFieldUpdateOperationsInput | $Enums.TicketPriority
    status?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    estimatedResponse?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SupportTicketUncheckedUpdateManyWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    category?: EnumTicketCategoryFieldUpdateOperationsInput | $Enums.TicketCategory
    priority?: EnumTicketPriorityFieldUpdateOperationsInput | $Enums.TicketPriority
    status?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    estimatedResponse?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIMessageUpdateWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumChatRoleFieldUpdateOperationsInput | $Enums.ChatRole
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAiMessagesNestedInput
  }

  export type AIMessageUncheckedUpdateWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: EnumChatRoleFieldUpdateOperationsInput | $Enums.ChatRole
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AIMessageUncheckedUpdateManyWithoutPropertyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: EnumChatRoleFieldUpdateOperationsInput | $Enums.ChatRole
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use UserCountOutputTypeDefaultArgs instead
     */
    export type UserCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PropertyCountOutputTypeDefaultArgs instead
     */
    export type PropertyCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PropertyCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserDefaultArgs instead
     */
    export type UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use RefreshTokenDefaultArgs instead
     */
    export type RefreshTokenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = RefreshTokenDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PropertyDefaultArgs instead
     */
    export type PropertyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PropertyDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SurveyDefaultArgs instead
     */
    export type SurveyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SurveyDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ProposalDefaultArgs instead
     */
    export type ProposalArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ProposalDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PaymentDefaultArgs instead
     */
    export type PaymentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PaymentDefaultArgs<ExtArgs>
    /**
     * @deprecated Use InstallationProgressDefaultArgs instead
     */
    export type InstallationProgressArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = InstallationProgressDefaultArgs<ExtArgs>
    /**
     * @deprecated Use EnergyStatDefaultArgs instead
     */
    export type EnergyStatArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = EnergyStatDefaultArgs<ExtArgs>
    /**
     * @deprecated Use NotificationDefaultArgs instead
     */
    export type NotificationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = NotificationDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AlertDefaultArgs instead
     */
    export type AlertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AlertDefaultArgs<ExtArgs>
    /**
     * @deprecated Use BillDefaultArgs instead
     */
    export type BillArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = BillDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SupportTicketDefaultArgs instead
     */
    export type SupportTicketArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SupportTicketDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AIMessageDefaultArgs instead
     */
    export type AIMessageArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AIMessageDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}