# Security Principles: Preventing Access Control Failures
**Created**: September 15, 2025
**Trigger**: Anonymous users gained access to premium forum categories (CLUB_H1, Oracle Chamber)
**Impact**: Critical security vulnerability exposing $25/month premium content

## The Security Mishap
**Root Cause**: Single line defaulted anonymous users to universal access
```typescript
// DANGEROUS CODE:
const hasAccess = currentUser ? canAccessCategory(...) : true  // ❌ Exposed everything
```

## Core Security Principles

### 1. DENY BY DEFAULT
- **Never** default to permissive access
- Start with denial, grant specific exceptions
- Anonymous users = BLUE_PILL badge level (most restrictive)

### 2. MAKE INSECURE CODE IMPOSSIBLE
Use TypeScript to prevent security mistakes:
```typescript
type AccessResult = 'GRANTED' | 'DENIED'
type UserContext = AuthenticatedUser | AnonymousUser

// Forces explicit handling of both authenticated and anonymous cases
const hasAccess: AccessResult = canAccessCategory(category.id, getUserContext(currentUser))
```

### 3. AUTOMATED SECURITY GATES
- Security tests run on every deploy
- Fails deployment if premium content is accessible to anonymous users
- Linting rules catch security antipatterns (`: true` in access control)

### 4. EXPLICIT ANONYMOUS HANDLING
**Never rely on implicit behavior for anonymous users**
```typescript
// SECURE PATTERN:
const userContext = currentUser
  ? { badge: currentUser.badge, isPaid: currentUser.isPaidMember }
  : { badge: BadgeLevel.BLUE_PILL, isPaid: false }  // Explicit anonymous handling
```

### 5. SECURITY-FIRST CODE COMMENTS
Guide AI development with security principles embedded in code:
```typescript
// SECURITY PRINCIPLE: DENY BY DEFAULT
// Anonymous users get BLUE_PILL access only
// NEVER default to true/permissive access
```

## Implementation Checklist

### TypeScript Security Types
- [ ] `AccessResult` type (GRANTED/DENIED)
- [ ] `UserContext` type (Authenticated/Anonymous)
- [ ] Explicit user context handling

### Automated Testing
- [ ] Security test suite for access control
- [ ] Anonymous user premium content tests
- [ ] Deploy-time security gate

### Code Safety
- [ ] ESLint security rules
- [ ] Security principle comments
- [ ] Permissive default detection

### Documentation
- [ ] AI security instructions in CLAUDE.md
- [ ] Security review process
- [ ] Incident response protocol

## AI Development Guidelines

### Before Any Access Control Changes:
1. **Ask**: "What can anonymous users see with this change?"
2. **Test**: Run `npm run test:security`
3. **Verify**: Check all premium categories are properly protected
4. **Review**: Does this follow DENY BY DEFAULT?

### Red Flags to Catch:
- `: true` in access control ternary operators
- Missing anonymous user handling
- Implicit permissions
- Default permissive behavior

## Business Impact
**Why This Matters**:
- Premium content = $25/month revenue per user
- Exposing CLUB_H1 content destroys business model
- Security breach = loss of member trust
- One AI mistake could expose 792 WhatsApp members' private discussions

**Prevention is Everything**: Code architecture must make security mistakes impossible, not just unlikely.

---
*"Don't rely on AI being careful - make insecure code impossible to write"*