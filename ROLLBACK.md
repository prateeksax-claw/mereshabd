# Mereshabd — Rollback Guide

Use this when a content or layout edit goes wrong.

## Rule Zero
If a page looks broken, stop and rollback cleanly instead of layering more fixes.

## Rollback Paths
### 1. Uncommitted single-file mistake
```bash
git restore site/<file>
```
Then rerun validation.

### 2. Broader uncommitted mistake
Restore from the latest timestamped zip backup into a clean temporary folder and compare before replacing.

### 3. Bad committed change
```bash
git revert <commit>
```
Then validate and inspect locally.

### 4. Large publishing mistake
Use the local backup zip or off-machine Drive backup as the restore source.

## Backup Sources
### Local
- `C:\Users\prate\.openclaw\workspace\backups\mereshabd`

### Off-machine
- Drive/email recovery copies created on 2026-04-06

## Mandatory After Rollback
1. rerun validator
2. inspect changed pages locally
3. confirm Hindi text and layout look right
4. commit restored state clearly

## Never Do This
- do not stack multiple blind patch scripts
- do not deploy without validation
- do not mix rollback with fresh redesign changes in the same pass
