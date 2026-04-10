#!/bin/bash
# Run this script ONCE on your EC2 instance to set up Docker + GitHub Actions runner
# Usage: chmod +x setup-ec2.sh && sudo ./setup-ec2.sh
set -e

RUNNER_USER="ubuntu"   # change to "ec2-user" if using Amazon Linux

echo "=== Installing Docker ==="
apt-get update -y
apt-get install -y ca-certificates curl gnupg lsb-release

install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
chmod a+r /etc/apt/keyrings/docker.gpg

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \
  https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" \
  | tee /etc/apt/sources.list.d/docker.list > /dev/null

apt-get update -y
apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

systemctl enable docker
systemctl start docker

# Allow runner user to use Docker without sudo
usermod -aG docker "$RUNNER_USER"

echo "=== Creating app directory ==="
mkdir -p /home/$RUNNER_USER/app
chown $RUNNER_USER:$RUNNER_USER /home/$RUNNER_USER/app

echo "=== Setting up GitHub Actions Self-Hosted Runner ==="
echo ""
echo "Now go to your GitHub repository:"
echo "  Settings > Actions > Runners > New self-hosted runner"
echo "  Select: Linux, x64"
echo "  Copy the token shown there, then run the following as the '$RUNNER_USER' user:"
echo ""
echo "  su - $RUNNER_USER"
echo "  mkdir -p ~/actions-runner && cd ~/actions-runner"
echo "  curl -o actions-runner-linux-x64-2.317.0.tar.gz -L https://github.com/actions/runner/releases/download/v2.317.0/actions-runner-linux-x64-2.317.0.tar.gz"
echo "  tar xzf ./actions-runner-linux-x64-2.317.0.tar.gz"
echo "  ./config.sh --url https://github.com/YOUR_ORG/YOUR_REPO --token YOUR_TOKEN"
echo "  sudo ./svc.sh install"
echo "  sudo ./svc.sh start"
echo ""
echo "=== Done ==="
echo "After completing runner setup, log out and back in (or run 'newgrp docker') for docker group to take effect."
