# Email Verification Flow - Backend Configuration

## Issue

When users click the email verification link, they get 401 errors and are redirected to login instead of verifying their email.

## Root Cause

The `verify-email` endpoint requires authentication, but users clicking the link from their email have no active session/auth cookies yet.

## Solution: Make verify-email Endpoint Public

### For Express.js Backend:

```javascript
// This endpoint should NOT have authentication middleware
// It's part of the signup/email verification flow

app.post("/api/v1/auth/verify-email", async (req, res) => {
  // NO authentication middleware here!
  // User has not logged in yet - they're just verifying email

  const { userId, token } = req.body;

  try {
    // Verify the token is valid and not expired
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        statusCode: 404,
        message: "User not found",
      });
    }

    // Check if token matches and isn't expired
    if (
      user.verificationToken !== token ||
      user.verificationTokenExpiry < new Date()
    ) {
      return res.status(400).json({
        statusCode: 400,
        message: "Invalid or expired verification token.",
        error: "Bad Request",
      });
    }

    // Mark email as verified
    user.isEmailVerified = true;
    user.verificationToken = null;
    user.verificationTokenExpiry = null;
    await user.save();

    return res.status(200).json({
      statusCode: 200,
      message: "Email verified successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      message: "Internal server error",
    });
  }
});
```

### For NestJS Backend:

```typescript
@Post('verify-email')
@Public() // Important: Add @Public() decorator if using auth guard globally
@HttpCode(200)
async verifyEmail(@Body() verifyEmailDto: VerifyEmailDto) {
  try {
    await this.authService.verifyEmail(
      verifyEmailDto.userId,
      verifyEmailDto.token
    );

    return {
      statusCode: 200,
      message: 'Email verified successfully.'
    };
  } catch (error) {
    if (error instanceof BadRequestException) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'Invalid or expired verification token.',
        error: 'Bad Request'
      });
    }
    throw error;
  }
}
```

### For Django Backend:

```python
@api_view(['POST'])
@permission_classes([AllowAny])  # Important: Allow any user (not authenticated)
def verify_email(request):
    user_id = request.data.get('userId')
    token = request.data.get('token')

    try:
        user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return Response(
            {'statusCode': 404, 'message': 'User not found'},
            status=status.HTTP_404_NOT_FOUND
        )

    # Check token validity and expiry
    if not user.verification_token or user.verification_token != token:
        return Response(
            {
                'statusCode': 400,
                'message': 'Invalid or expired verification token.',
                'error': 'Bad Request'
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    if user.verification_token_expiry < timezone.now():
        return Response(
            {
                'statusCode': 400,
                'message': 'Invalid or expired verification token.',
                'error': 'Bad Request'
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    # Mark email as verified
    user.is_email_verified = True
    user.verification_token = None
    user.verification_token_expiry = None
    user.save()

    return Response(
        {
            'statusCode': 200,
            'message': 'Email verified successfully.'
        },
        status=status.HTTP_200_OK
    )
```

## Key Points

1. **No Authentication Required**
   - The `/api/v1/auth/verify-email` endpoint should be PUBLIC
   - Users calling it have NOT yet logged in
   - Don't require JWT token or auth middleware

2. **URL Format**
   - Frontend sends: `https://your-frontend.com/verify-email?userId=X&token=Y`
   - Backend endpoint: `POST /api/v1/auth/verify-email`
   - Request body:
     ```json
     {
       "userId": "user-id-from-url",
       "token": "token-from-url"
     }
     ```

3. **Response Format**
   - Success (200):
     ```json
     {
       "statusCode": 200,
       "message": "Email verified successfully."
     }
     ```
   - Error (400):
     ```json
     {
       "statusCode": 400,
       "message": "Invalid or expired verification token.",
       "error": "Bad Request"
     }
     ```

4. **Resend Verification Email Endpoint**
   - This can require authentication OR be public (both work)
   - Endpoint: `POST /api/v1/auth/resend-verification-email`
   - Request: `{ "email": "user@example.com" }`

## Frontend Changes Made

✅ AuthProvider now handles 401 errors gracefully during initial load
✅ Axios interceptor doesn't redirect on public pages like `/verify-email`
✅ VerifyEmail component has better error handling

## Testing Checklist

- [ ] Clear your auth cookies
- [ ] Click the email verification link in a new browser/incognito window
- [ ] Verify page loads with success message (not redirected to login)
- [ ] Click "Continue to Login"
- [ ] Email should now show as verified in backend
- [ ] User can login successfully

## Debugging

If still getting 401 errors, check:

1. **Is the endpoint behind auth middleware?**
   - Remove authentication requirement from `/api/v1/auth/verify-email`

2. **Does the backend allow CORS for this endpoint?**
   - Ensure CORS headers allow the request

3. **Is the token format correct?**
   - Token should be a string (not JSON)
   - Check if backend expects bearer token format

4. **Check backend logs**
   - Verify the POST request is reaching the endpoint
   - Check what error is being thrown

## Common Issues & Solutions

| Issue                     | Solution                                                                 |
| ------------------------- | ------------------------------------------------------------------------ |
| Still getting 401         | Remove all auth middleware from verify-email endpoint                    |
| Token not found           | Ensure token is being stored when user registers                         |
| Token expired             | Check token expiry logic in backend                                      |
| Email not marked verified | Verify that `isEmailVerified` field is being updated                     |
| Link format wrong         | Ensure userId and token are URL params: `/verify-email?userId=X&token=Y` |
