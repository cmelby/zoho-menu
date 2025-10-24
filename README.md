# zoho-menu

A repository for managing Zoho menu configurations.

## Getting Started

This guide will help you push an existing local repository to this GitHub repository.

### Prerequisites

- Git installed on your local machine
- A GitHub account with access to this repository
- Your local repository ready to push

### Clone This Repository to Your Desktop

If you want to start fresh and clone this repository to your desktop:

```bash
git clone https://github.com/cmelby/zoho-menu.git
cd zoho-menu
```

### Push an Existing Local Repository to GitHub

If you have an existing repository on your desktop that you want to push to this GitHub repository:

#### Option 1: Push to an Empty GitHub Repository

If this GitHub repository is empty or you want to replace its contents:

```bash
# Navigate to your local repository
cd /path/to/your/local/repo

# Add this GitHub repository as a remote
git remote add origin https://github.com/cmelby/zoho-menu.git

# Verify the remote was added
git remote -v

# Push your code to GitHub
git push -u origin main
```

**Note:** If your default branch is named `master` instead of `main`, use:
```bash
git push -u origin master
```

#### Option 2: Push to an Existing GitHub Repository

If this repository already has content and you want to merge your local changes:

```bash
# Navigate to your local repository
cd /path/to/your/local/repo

# Add this GitHub repository as a remote
git remote add origin https://github.com/cmelby/zoho-menu.git

# Fetch the existing content
git fetch origin

# Merge or rebase with the existing content
git pull origin main --allow-unrelated-histories

# Resolve any conflicts if they occur

# Push your merged changes
git push -u origin main
```

### Setting Up a New Local Repository

If you're starting from scratch:

```bash
# Create a new directory
mkdir zoho-menu
cd zoho-menu

# Initialize git
git init

# Create your files
# ... add your code here ...

# Add files to git
git add .

# Commit your changes
git commit -m "Initial commit"

# Add the GitHub repository as remote
git remote add origin https://github.com/cmelby/zoho-menu.git

# Push to GitHub
git push -u origin main
```

### Troubleshooting

#### Authentication Issues

If you encounter authentication issues, you may need to:

1. **Use a Personal Access Token (PAT)**: GitHub no longer accepts passwords for Git operations. Generate a PAT in GitHub Settings > Developer settings > Personal access tokens.

2. **Use SSH**: Set up SSH keys for easier authentication:
   ```bash
   # Generate SSH key (if you don't have one)
   ssh-keygen -t ed25519 -C "your_email@example.com"
   
   # Add to GitHub in Settings > SSH and GPG keys
   
   # Use SSH remote URL
   git remote set-url origin git@github.com:cmelby/zoho-menu.git
   ```

#### Branch Name Mismatch

If you get an error about branch names:

```bash
# Rename your local branch to main
git branch -M main

# Then push
git push -u origin main
```

#### Repository Not Empty Error

If GitHub says the repository is not empty and rejects your push:

```bash
# Force push (WARNING: This will overwrite remote content)
git push -u origin main --force
```

**Warning:** Only use `--force` if you're certain you want to replace all content in the GitHub repository.

### Next Steps

After successfully pushing your code:

1. Review your repository on GitHub
2. Set up branch protection rules if needed
3. Configure GitHub Actions for CI/CD
4. Add collaborators if working in a team
5. Create issues and project boards for tracking work

## Contributing

Please feel free to submit issues and pull requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
